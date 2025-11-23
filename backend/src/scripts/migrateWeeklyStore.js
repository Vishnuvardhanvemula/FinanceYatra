#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

import WeeklyChallenge from '../models/WeeklyChallenge.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.resolve(__dirname, '../data/weekly_store.json');

async function connect() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/financeyatra';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB', uri);
}

async function migrate() {
  if (!fs.existsSync(STORE_PATH)) {
    console.log(`No store found at ${STORE_PATH}, nothing to migrate`);
    process.exit(0);
  }
  const raw = fs.readFileSync(STORE_PATH, 'utf8');
  const arr = JSON.parse(raw || '[]') || [];
  if (!Array.isArray(arr) || arr.length === 0) {
    console.log('No weekly entries found in store');
    process.exit(0);
  }

  for (const w of arr) {
    try {
      const exists = await WeeklyChallenge.findOne({ weekId: w.weekId });
      if (exists) {
        console.log(`Week ${w.weekId} already exists in DB, skipping`);
        continue;
      }

      const createDoc = {
        weekId: w.weekId,
        theme: w.theme || w.title || 'Weekly',
        description: w.description || '',
        startDate: w.startDate ? new Date(w.startDate) : undefined,
        endDate: w.endDate ? new Date(w.endDate) : undefined,
        tasks: w.tasks || []
      };
      await WeeklyChallenge.create(createDoc);
      console.log(`Migrated week ${w.weekId}`);
    } catch (err) {
      console.error(`Failed to migrate week ${w.weekId}`, err.message);
    }
  }

  console.log('Migration complete');
}

connect().then(() => migrate()).then(() => mongoose.disconnect()).catch(err => {
  console.error('Migration failed', err);
  process.exit(1);
});
