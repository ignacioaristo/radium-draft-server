import dotenv from 'dotenv';
import firebaseAdmin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { DeleteResult, InsertManyResult } from 'mongodb';
import mongoose, { AnyObject } from 'mongoose';

import Player from '../src/models/player';
import { firebaseUsers, players } from './data';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert({
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
});

const config = {
  remove: process.env.SEEDER_REMOVE === 'true',
  create: process.env.SEEDER_CREATE === 'true',
  firebaseUsers: {
    remove: process.env.SEEDER_FIREBASE_USERS__REMOVE === 'true',
    create: process.env.SEEDER_FIREBASE_USERS__CREATE === 'true',
  },
  players: {
    remove: process.env.SEEDER_PLAYERS__REMOVE === 'true',
    create: process.env.SEEDER_PLAYERS__CREATE === 'true',
  },
};

(async () => {
  console.log('     ----------------------');
  console.log('---- | Board configuration | ----');
  console.log('     ----------------------');
  Object.entries(config).forEach((item) => {
    if (typeof item[1] === 'boolean') {
      console.log(`     ▒ ${item[0]} ${item[1]}`);
    } else if (typeof item[1] === 'object') {
      const label = Object.entries(item[1])
        .filter((subItem) => subItem[1])
        .map((subItem) => subItem[0]);
      if (label.length) {
        console.log(`     ■ ${item[0]} ==> ${label}`);
      }
    }
  });

  mongoose.set('strictQuery', false);
  await mongoose.connect(`${process.env.DATABASE_URL}`);

  try {
    if (config.remove) {
      // ------------ REMOVE FIREBASE USERS ----------- [start]
      let removeFirebaseUsers: Promise<void>[] = [];
      if (config.firebaseUsers.remove) {
        const firebaseCurrentUsers = await firebaseAdmin.auth().listUsers();
        removeFirebaseUsers = firebaseCurrentUsers.users.map((user) => {
          return firebaseAdmin.auth().deleteUser(user.uid);
        });
      }
      // ------------ REMOVE FIREBASE USERS -------- [end]

      // ------------ REMOVE MONGODB COLLECTIONS -- [start]
      const promises: Promise<DeleteResult>[] = [];
      if (config.players.remove) {
        promises.push(Player.collection.deleteMany({}));
      }
      // ------------ REMOVE MONGODB COLLECTIONS -- [end]

      await Promise.all([Promise.all(removeFirebaseUsers), Promise.all(promises)]);

      console.log('|-------------------- Previous data removed ----------------------|');
    }

    if (config.create) {
      // ------------ CREATE FIREBASE USERS ----------- [start]
      let createFirebaseUsers: Promise<UserRecord>[] = [];
      if (config.firebaseUsers.create) {
        createFirebaseUsers = firebaseUsers.map((user) => {
          const { userType, ...firebaseUser } = user;
          return firebaseAdmin
            .auth()
            .createUser(firebaseUser)
            .then(async (userRecord) => {
              await firebaseAdmin.auth().setCustomUserClaims(userRecord.uid, { userType });
              return userRecord;
            });
        });
      }
      // ------------ CREATE FIREBASE USERS ----------- [end]

      // ------------ UPLOAD MONGODB COLLECTIONS -- [start]
      const promises: Promise<InsertManyResult<AnyObject>>[] = [];
      if (config.players.create) {
        promises.push(Player.collection.insertMany(players));
      }
      // ------------ UPLOAD MONGODB COLLECTIONS -- [end]
      await Promise.all([Promise.all(createFirebaseUsers), Promise.all(promises)]);

      console.log('|----------------------- New data added --------------------------|');
    }
    process.exit();
  } catch (err) {
    console.log('SEEDER Error - %o', err);
    process.exit();
  }
})();
