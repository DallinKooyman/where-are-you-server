// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import mongoose, { InferSchemaType, Schema } from 'mongoose';

const tokenSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  tokenHash: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true }, // One Token per device
  createdAt: { type: Date, required: true },
  lastUsedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true }, // Time until expiry if not used
  revokedAt: { type: Date, default: null },
});

export const TokenModel = mongoose.model('Token', tokenSchema);

export type TokenModelSchemaShape = InferSchemaType<typeof tokenSchema>;

export interface TokenPopulated {
  _id: string;
  tokenHash: string;
  userId: string;
  deviceId: string;
  createdAt: Date;
  lastUsedAt: Date;
  expiresAt: Date;
  revokedAt: Date | null;
}
