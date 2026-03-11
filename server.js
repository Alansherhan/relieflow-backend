import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';
import router from './src/routes/apiRoutes.js';
import portalRoutes from './src/routes/portal.routes.js';
import AdminJS from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import bcrypt from 'bcrypt';

import adminUser from './src/models/adminUser.js';
import { adminForgotPassword, adminResetPassword } from './src/controllers/adminUserController.js';
import AidRequest from './src/models/AidRequest.js';
import CalamityType from './src/models/CalamityType.js';
import DonationRequest from './src/models/DonationRequest.js';
import ReliefCenter from './src/models/ReliefCenter.js';
import Task from './src/models/Task.js';
import userProfile from './src/models/userProfile.js';
import { getHeatmapData } from './src/controllers/heatmapController.js';
import {
  AdminResource,
  AidRequestResource,
  CalamityTypeResource,
  DisasterTipsResource,
  DonationRequestResource,
  // DonationResource,
  QuizQuestionResource,
  ReliefCenterResource,
  TaskResource,
  UserProfileResource,
  NotificationResource,
  PortalDonationResource,
  AdminWalletResource,
} from './src/dashboard/resources.js';
import {
  componentLoader,
  Components,
} from './src/dashboard/components/components.js';

dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trust Render's reverse proxy (required for secure cookies behind HTTPS proxy)
app.set('trust proxy', 1);

// Serve AdminJS components bundle directly — bypasses AdminJS's internal router
// which fails to serve this file on Render due to middleware chain issues
const bundlePath = path.join(__dirname, '.adminjs', 'bundle.js');
const bundlePathCwd = path.resolve('.adminjs', 'bundle.js');
const resolvedBundlePath = fs.existsSync(bundlePath) ? bundlePath : bundlePathCwd;
console.log('AdminJS bundle path:', resolvedBundlePath, '| exists:', fs.existsSync(resolvedBundlePath));

// Pre-read bundle into memory at startup for reliable serving
let bundleContent;
try {
  bundleContent = fs.readFileSync(resolvedBundlePath, 'utf-8');
  console.log('AdminJS bundle loaded into memory:', bundleContent.length, 'bytes');
} catch (err) {
  console.error('Failed to read AdminJS bundle:', err.message);
}

app.get('/dashboard/frontend/assets/components.bundle.js', (req, res) => {
  if (!bundleContent) {
    return res.status(404).send('Bundle not found');
  }
  res.set('Content-Type', 'application/javascript');
  res.send(bundleContent);
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

// CORS configuration for donation portal
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      process.env.PORTAL_URL, // Production portal URL (Vercel)
      process.env.RENDER_EXTERNAL_URL, // Render backend URL (for AdminJS)
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/images', express.static(path.join(__dirname, 'assets/images')));

// Request logging middleware - DEBUG
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

//handle image uploads

const db = mongoose
  .connect(process.env.MONGO_URL)
  .then((v) => console.log('connected'));

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminOptions = {
  resources: [
    AdminResource,
    AidRequestResource,
    CalamityTypeResource,
    // DonationResource,
    DonationRequestResource,
    ReliefCenterResource,
    TaskResource,
    UserProfileResource,
    DisasterTipsResource,
    QuizQuestionResource,
    NotificationResource,
    PortalDonationResource,
    AdminWalletResource,
  ],
  rootPath: '/dashboard',

  dashboard: {
    component: Components.Dashboard,
  },

  loginPath: '/dashboard/login',
  logoutPath: '/dashboard/logout',
  componentLoader,



  branding: {
    companyName: 'RelieFlow',
    logo: '/images/RelieFlow.png',
    withMadeWithLove: false,
    softwareBrothers: false,
    favicon: '/images/favicon.ico',
    theme: {
      colors: {
        primary100: '#2563eb',
        primary80: '#3b82f6',
        primary60: '#60a5fa',
        love: '#10b981',
        accent: '#f59e0b',
        info: '#06b6d4',
      },
      font: 'Inter, sans-serif',
      sidebar: {
        width: 260,
      },
      logo: {
        maxWidth: 60,
        maxHeight: 60,
      },
    },
  },

  assets: {
    styles: ['/css/admin-custom.css'],
  },

  locale: {
    language: 'en',
    availableLanguages: ['en'],
    localeDetection: true,
  },
};

const adminJS = new AdminJS(adminOptions);

// Skip runtime re-bundling — bundle is pre-built during the build step (see build-adminjs.js)
// buildAuthenticatedRouter() calls adminJS.initialize() internally which would
// re-bundle and can fail on memory-constrained hosts (Render free tier).
adminJS.initialize = async () => {};

// Session middleware - MUST use same cookie name as AdminJS router to share session
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret:
    process.env.SESSION_SECRET || 'another-secret-key-at-least-32-characters',
  cookie: {
    httpOnly: true,
    secure: false, // Render/Cloudflare handles HTTPS termination
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
  name: 'adminjs-session',
});

app.use(sessionMiddleware);

// Authentication configuration
const authenticate = async (email, password) => {
  try {
    const admin = await adminUser.findOne({ email });
    if (admin && (await admin.comparePassword(password))) {
      return {
        email: admin.email,
        position: admin.position,
        id: admin._id.toString(),
      };
    }
    return null;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

// Custom login page route - MUST come BEFORE admin router
app.get('/dashboard/login', (req, res) => {
  if (req.session.adminUser) {
    return res.redirect('/dashboard');
  }

  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle forgot password POST
app.post('/dashboard/forgot-password', async (req, res) => {
  return adminForgotPassword(req, res);
});

// Handle reset password POST
app.post('/dashboard/reset-password', async (req, res) => {
  return adminResetPassword(req, res);
});

// Handle login POST
app.post('/dashboard/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await authenticate(email, password);

  if (admin) {
    req.session.adminUser = admin;
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: 'Session save failed' });
      }
      res.json({ redirectUrl: '/dashboard' });
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Build authenticated router — AdminJS handles sessions
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJS,
  {
    authenticate,
    cookieName: 'adminjs',
    cookiePassword:
      process.env.COOKIE_SECRET ||
      'some-secret-password-at-least-32-characters-long',
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret:
      process.env.SESSION_SECRET || 'another-secret-key-at-least-32-characters',
    cookie: {
      httpOnly: true,
      secure: false, // Render/Cloudflare handles HTTPS termination
      maxAge: 1000 * 60 * 60 * 24,
    },
    name: 'adminjs-session',
  }
);

// Mount admin router
app.use(adminJS.options.rootPath, adminRouter);

// Portal API routes
app.use('/api/portal', portalRoutes);

// Heatmap API route for dashboard
app.get('/api/dashboard/heatmap', getHeatmapData);

// Dashboard stats API route
import { getDashboardStats } from './src/controllers/dashboardController.js';
app.get('/api/dashboard/stats', getDashboardStats);

app.use('/', router);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Bind to all interfaces (required for Render)
app.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`AdminJS available at http://localhost:${PORT}/dashboard`);
});
// Trigger restart
