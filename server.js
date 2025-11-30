import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/apiRoutes.js';
import AdminJS from 'adminjs';
import path from 'path';
import { fileURLToPath } from 'url';

import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import bcrypt from 'bcrypt';

import adminUser from './src/models/adminUser.js';
import AidRequest from './src/models/AidRequest.js';
import CalamityType from './src/models/CalamityType.js';
import Donation from './src/models/Donation.js';
import DonationRequest from './src/models/DonationRequest.js';
import ReliefCenter from './src/models/ReliefCenter.js';
import Task from './src/models/Task.js';
import userProfile from './src/models/userProfile.js';
import {
  AdminResource,
  AidRequestResource,
  CalamityTypeResource,
  DonationRequestResource,
  DonationResource,
  ReliefCenterResource,
  TaskResource,
  UserProfileResource,
} from './src/dashboard/resources.js';
import {
  componentLoader,
  Components,
} from './src/dashboard/components/components.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

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
    DonationResource,
    DonationRequestResource,
    ReliefCenterResource,
    TaskResource,
    UserProfileResource,
  ],
  rootPath: '/dashboard',

  dashboard: {
    component: Components.Dashboard,
  },

  loginPath: '/dashboard/login',
  logoutPath: '/dashboard/logout',
  componentLoader,

  branding: {
    companyName: 'Relief Management System',
    logo: '/images/logo.png',
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
adminJS.watch();

// Session middleware
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret:
    process.env.SESSION_SECRET || 'another-secret-key-at-least-32-characters',
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24,
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

// Build authenticated router
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
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24,
    },
    name: 'adminjs-session',
  }
);

// Mount admin router
app.use(adminJS.options.rootPath, adminRouter);

app.use('/', router);

app.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log(`AdminJS available at http://localhost:3000/dashboard`);
});
