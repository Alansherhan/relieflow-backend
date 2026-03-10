// ============================================================================
// COMPREHENSIVE DATABASE SEEDER FOR RELIEFFLOW
// ============================================================================
// Usage:
//   node src/seeder.js              # Seed all data (skip existing)
//   node src/seeder.js --reset      # Clear collections then seed
//   node src/seeder.js --reset-only # Only clear collections
//   node src/seeder.js --force      # Skip confirmation prompts
// ============================================================================

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';

// Models
import CalamityType from './models/CalamityType.js';
import AdminUser from './models/adminUser.js';
import AdminWallet from './models/AdminWallet.js';
import ReliefCenter from './models/ReliefCenter.js';
import DisasterTip from './models/disasterTip.js';
import QuizQuestion from './models/quiz.js';

// Seed Data
import {
  calamityTypes,
  adminUsers,
  reliefCenters,
  disasterTips,
  quizQuestions,
} from './seed-data.js';

dotenv.config();

// ============================================================================
// CLI ARGUMENT PARSING
// ============================================================================
const args = process.argv.slice(2);
const flags = {
  reset: args.includes('--reset'),
  resetOnly: args.includes('--reset-only'),
  force: args.includes('--force'),
};

// ============================================================================
// COLORS FOR CONSOLE OUTPUT
// ============================================================================
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) =>
    console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}`),
  count: (name, count) =>
    console.log(`  ${colors.magenta}→${colors.reset} ${name}: ${count}`),
};

// ============================================================================
// PROMPT FOR CONFIRMATION
// ============================================================================
async function confirm(message) {
  if (flags.force) return true;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      `${colors.yellow}⚠${colors.reset} ${message} (y/N): `,
      (answer) => {
        rl.close();
        resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
      }
    );
  });
}

// ============================================================================
// RESET COLLECTIONS (ALL COLLECTIONS IN DATABASE)
// ============================================================================
async function resetCollections() {
  log.header('🗑️  Clearing ALL collections in database...');

  // Get all collections from the database
  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const collection of collections) {
    const collectionName = collection.name;
    try {
      const result = await mongoose.connection.db
        .collection(collectionName)
        .deleteMany({});
      log.count(collectionName, `${result.deletedCount} deleted`);
    } catch (error) {
      log.warning(`Could not clear ${collectionName}: ${error.message}`);
    }
  }

  log.success('All collections cleared');
}

// ============================================================================
// SEED CALAMITY TYPES
// ============================================================================
async function seedCalamityTypes() {
  log.header('🌊 Seeding Calamity Types...');

  let created = 0;
  let skipped = 0;

  for (const calamity of calamityTypes) {
    const existing = await CalamityType.findOne({
      calamityName: calamity.calamityName,
    });
    if (existing) {
      skipped++;
    } else {
      await CalamityType.create(calamity);
      created++;
    }
  }

  log.count('Created', created);
  log.count('Skipped (existing)', skipped);
}

// ============================================================================
// SEED ADMIN USERS
// ============================================================================
async function seedAdminUsers() {
  log.header('👤 Seeding Admin Users...');

  let created = 0;
  let skipped = 0;

  for (const admin of adminUsers) {
    const existing = await AdminUser.findOne({ email: admin.email });
    if (existing) {
      skipped++;
    } else {
      await AdminUser.create(admin);
      created++;
    }
  }

  log.count('Created', created);
  log.count('Skipped (existing)', skipped);

  if (created > 0) {
    log.info(
      `Default admin: ${adminUsers[0].email} / ${adminUsers[0].password}`
    );
  }
}

// ============================================================================
// SEED ADMIN WALLET (Singleton)
// ============================================================================
async function seedAdminWallet() {
  log.header('💰 Seeding Admin Wallet...');

  const existing = await AdminWallet.findOne({});
  if (existing) {
    log.count('Skipped', '1 (wallet exists)');
  } else {
    await AdminWallet.create({
      name: 'Main Relief Fund',
      description: 'Central fund for disaster relief operations',
      balance: 0,
      transactions: [],
      totalCredits: 0,
      totalDebits: 0,
      donorCount: 0,
    });
    log.count('Created', 1);
  }
}

// ============================================================================
// SEED RELIEF CENTERS
// ============================================================================
async function seedReliefCenters() {
  log.header('🏥 Seeding Relief Centers...');

  let created = 0;
  let skipped = 0;

  for (const center of reliefCenters) {
    const existing = await ReliefCenter.findOne({
      shelterName: center.shelterName,
    });
    if (existing) {
      skipped++;
    } else {
      await ReliefCenter.create(center);
      created++;
    }
  }

  log.count('Created', created);
  log.count('Skipped (existing)', skipped);
}

// ============================================================================
// SEED DISASTER TIPS
// ============================================================================
async function seedDisasterTips() {
  log.header('📖 Seeding Disaster Tips...');

  let created = 0;
  let skipped = 0;

  for (const tip of disasterTips) {
    const existing = await DisasterTip.findOne({ slug: tip.slug });
    if (existing) {
      skipped++;
    } else {
      await DisasterTip.create(tip);
      created++;
    }
  }

  log.count('Created', created);
  log.count('Skipped (existing)', skipped);
}

// ============================================================================
// SEED QUIZ QUESTIONS
// ============================================================================
async function seedQuizQuestions() {
  log.header('❓ Seeding Quiz Questions...');

  let created = 0;
  let skipped = 0;

  for (const quiz of quizQuestions) {
    const existing = await QuizQuestion.findOne({
      question: quiz.question,
      category: quiz.category,
    });
    if (existing) {
      skipped++;
    } else {
      await QuizQuestion.create(quiz);
      created++;
    }
  }

  log.count('Created', created);
  log.count('Skipped (existing)', skipped);
}

// ============================================================================
// MAIN SEEDER FUNCTION
// ============================================================================
async function runSeeder() {
  console.log('\n' + '='.repeat(60));
  console.log(
    `${colors.bright}${colors.cyan}  RELIEFFLOW DATABASE SEEDER${colors.reset}`
  );
  console.log('='.repeat(60));

  // Show flags
  if (flags.reset) log.warning('Reset mode: Collections will be cleared first');
  if (flags.resetOnly)
    log.warning('Reset-only mode: Only clearing collections');
  if (flags.force) log.info('Force mode: Skipping confirmations');

  try {
    // Connect to MongoDB
    log.header('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);
    log.success(`Connected to: ${mongoose.connection.host}`);

    // Handle reset
    if (flags.reset || flags.resetOnly) {
      const confirmed = await confirm(
        'This will DELETE all data in seeded collections. Continue?'
      );
      if (!confirmed) {
        log.warning('Aborted by user');
        process.exit(0);
      }
      await resetCollections();

      if (flags.resetOnly) {
        log.header('✅ Reset complete. Exiting...');
        process.exit(0);
      }
    }

    // Run seeders in dependency order
    await seedCalamityTypes();
    await seedAdminUsers();
    await seedAdminWallet();
    await seedReliefCenters();
    await seedDisasterTips();
    await seedQuizQuestions();

    // Summary
    log.header('📊 SEEDING SUMMARY');
    const counts = {
      calamityTypes: await CalamityType.countDocuments(),
      adminUsers: await AdminUser.countDocuments(),
      adminWallets: await AdminWallet.countDocuments(),
      reliefCenters: await ReliefCenter.countDocuments(),
      disasterTips: await DisasterTip.countDocuments(),
      quizQuestions: await QuizQuestion.countDocuments(),
    };

    log.count('CalamityType', counts.calamityTypes);
    log.count('AdminUser', counts.adminUsers);
    log.count('AdminWallet', counts.adminWallets);
    log.count('ReliefCenter', counts.reliefCenters);
    log.count('DisasterTip', counts.disasterTips);
    log.count('QuizQuestion', counts.quizQuestions);

    console.log('\n' + '='.repeat(60));
    log.success(
      `${colors.bright}Database seeding completed successfully!${colors.reset}`
    );
    console.log('='.repeat(60) + '\n');

    process.exit(0);
  } catch (error) {
    log.error(`Seeding failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

// Run the seeder
runSeeder();
