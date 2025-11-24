import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/apiRoutes.js';
import AdminJS from 'adminjs';

import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';

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
import { componentLoader } from './src/dashboard/components/components.js';

dotenv.config();

const app = express();

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
  componentLoader,

  locale: {
    language: 'en', // default language
    availableLanguages: ['en'], // enabled languages
    localeDetection: true, // auto-detect from browser/user
  },
};

const adminJS = new AdminJS(adminOptions);

adminJS.watch();

const adminRouter = AdminJSExpress.buildRouter(adminJS);
app.use(adminJS.options.rootPath, adminRouter);

app.use(express.json());
app.use(express.static('public'));
app.use('/', router);

app.listen(3000, () => console.log('Server running on port 3000'));
