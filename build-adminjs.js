/**
 * Pre-build AdminJS component bundles during the build step.
 * This avoids having to bundle at runtime (which can fail on
 * low-memory environments like Render free tier).
 *
 * Usage: node build-adminjs.js
 */
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import { componentLoader, Components } from './src/dashboard/components/components.js';

AdminJS.registerAdapter(AdminJSMongoose);

const adminJS = new AdminJS({
  componentLoader,
  rootPath: '/dashboard',
  dashboard: { component: Components.Dashboard },
});

console.log('AdminJS: Building component bundles...');
await adminJS.initialize();
console.log('AdminJS: Component bundles built successfully!');
process.exit(0);
