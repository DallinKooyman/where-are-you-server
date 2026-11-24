// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import mongoose from 'mongoose';

export const initializeMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017');
    console.debug('Mongo connected successfuly');
  } catch (err) {
    console.error('Mongo could not connect: ', err);
  }
};
