// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: String,
  password: { type: String, required: false, select: false }, //select is false to exclude it by default with find calls
});

export const UserModel = mongoose.model('User', userSchema);

// The Object Type that is returned from the find calls
export interface UserSchemaShape {
  _id: string; // MongoDB ObjectId
  name: string;
  password: string;
}
