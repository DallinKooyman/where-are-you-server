// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { QueryFilter } from 'mongoose';
import mongoose from 'mongoose';
import {
  FriendshipModel,
  FriendshipPopulated,
  FriendshipSchemaShape,
} from '../models/friendship.js';
import { CreateFriendshipInput, Friendship } from '../types/friendship.js';
import { Status } from '../types/friendshipStatus.js';
import { toUser } from './userRepository.js';

export const friendshipRepository = {
  async create(data: CreateFriendshipInput[]): Promise<Friendship> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const [friendship1] = await FriendshipModel.create(data, { session });
      await session.commitTransaction();

      const friendship = await this.findById(friendship1._id!.toString());
      if (!friendship) {
        throw new Error(
          `Failed to retrieve newly created friendship with id: ${friendship1._id?.toString}\n` +
            `with user: ${data[0].user}\n` +
            `and friend: ${data[0].friend}`
        );
      }
      return friendship;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  },
  async findByFilter(filter: QueryFilter<FriendshipSchemaShape>): Promise<Friendship[]> {
    const docs = await FriendshipModel.find(filter)
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated[]>();
    return docs.map((doc: FriendshipPopulated) => toFriendship(doc));
  },
  async findById(id: string): Promise<Friendship | null> {
    const doc = await FriendshipModel.findById(id)
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated>();
    return doc ? toFriendship(doc) : null;
  },
  async findByUser(userId: string): Promise<Friendship[]> {
    const docs = await FriendshipModel.find({ user: userId })
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated[]>();
    return docs.map((doc: FriendshipPopulated) => toFriendship(doc));
  },
  async findByUserAndFriend(userId: string, friendId: string): Promise<Friendship | null> {
    const doc = await FriendshipModel.find({ user: userId, friend: friendId })
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated>();
    return doc ? toFriendship(doc) : null;
  },
  async findByUserAndStatus(userId: string, status: Status): Promise<Friendship[] | undefined> {
    const friendships = await this.findByUser(userId);
    return friendships?.filter((friendship) => status === friendship.status);
  },
  async getAllFriendships() {
    const friendships = await FriendshipModel.find().lean<FriendshipPopulated[]>();
    return friendships.map((friendship: FriendshipPopulated) => toFriendship(friendship));
  },
  async updateFriendshipStatus(user: string, friend: string, status: Status): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await FriendshipModel.updateMany(
        {
          $or: [
            { user: user, friend: friend },
            { user: friend, friend: user },
          ],
        },
        { status },
        { session }
      );

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  },
  async deleteFriendship(user: string, friend: string): Promise<void> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await FriendshipModel.deleteMany(
        {
          $or: [
            { user: user, friend: friend },
            { user: friend, friend: user },
          ],
        },
        { session }
      );

      await session.commitTransaction();
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      await session.endSession();
    }
  },
};

function toFriendship(doc: FriendshipPopulated): Friendship {
  return {
    id: doc._id!.toString(),
    user: toUser(doc.user),
    friend: toUser(doc.friend),
    requesterId: doc.requesterId,
    status: doc.status as Status,
    createdAt: doc.createdAt,
  };
}
