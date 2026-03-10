import admin from 'firebase-admin';
import { readFileSync } from 'fs';

try {
    // Try to initialize Firebase Admin SDK
    const serviceAccount = JSON.parse(readFileSync('./firebase-service-account.json', 'utf8'));
    
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }
    
    console.log('✅ Firebase Admin SDK initialized successfully!');
    console.log('✅ Project ID:', serviceAccount.project_id);
    console.log('✅ File found and readable');
    process.exit(0);
} catch (error) {
    console.error('❌ Firebase setup failed:', error.message);
    process.exit(1);
}