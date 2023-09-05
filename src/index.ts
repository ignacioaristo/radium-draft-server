import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';

dotenv.config();

mongoose.Promise = global.Promise;

export const mongooseConnection = () =>
  new Promise<void>((resolve, reject) => {
    const DATABASE_URL = process.env.DATABASE_URL;

    mongoose.set('strictQuery', false);

    mongoose.connect(`${DATABASE_URL}`, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    const db = mongoose.connection;

    db.on('error', function (err) {
      reject(err);
    });

    db.once('open', function () {
      console.log('Connection to DB successful');
      resolve();
    });
  });

const PORT = 3333;

const startApp = async () => {
  try {
    await mongooseConnection();
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}!`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
