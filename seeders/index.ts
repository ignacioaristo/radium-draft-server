import 'dotenv/config';
import dotenv from 'dotenv';
import { DeleteResult, InsertManyResult } from 'mongodb';
import mongoose from 'mongoose';

import Player from '../src/models/player';
import players from './data/players';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config = {
  remove: true,
  create: true,
  players: {
    remove: true,
    create: true,
  },
};

(async () => {
  await mongoose.connect(`${process.env.DATABASE_URL}`);

  try {
    if (config.players.remove) {
      const promises: Promise<DeleteResult>[] = [];
      promises.push(Player.collection.deleteMany({}));
      await Promise.all(promises);
    }

    if (config.players.create) {
      const promises: Promise<InsertManyResult>[] = [];
      promises.push(Player.collection.insertMany(players));
      await Promise.all(promises);
    }

    process.exit();
  } catch (err) {
    process.exit();
  }
})();
