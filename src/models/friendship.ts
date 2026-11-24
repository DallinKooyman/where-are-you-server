// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { UserSchemaShape } from './user.js';
import { Status } from '../types/friendshipStatus.js';

const friendshipSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  friend: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  requesterId: { type: String, required: true },
  status: { type: Status, default: Status.Pending },
  createdAt: { type: Date, default: Date.now },
});

export const FriendshipModel = mongoose.model('Friendship', friendshipSchema);

export type FriendshipSchemaShape = InferSchemaType<typeof friendshipSchema>;

export interface FriendshipPopulated {
  _id: string;
  user: UserSchemaShape;
  friend: UserSchemaShape;
  requesterId: string;
  status: Status;
  createdAt: Date;
}
