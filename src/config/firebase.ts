import dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const Firebase = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});
