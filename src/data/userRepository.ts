// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { UserModel, UserSchemaShape } from '../models/user.js';
import { User, CreateUserInput } from '../types/user.js';

export const userRepository = {
  async create(data: CreateUserInput): Promise<User> {
    const doc = await UserModel.create(data);
    const user = await this.findByName(data.name);
    if (!user) {
      throw new Error(
        `Failed to retrieve newly created user with id: ${doc._id?.toString} \n and name: ${doc.name}`
      );
    }
    return user;
  },
  async findById(id: string): Promise<User | null> {
    const user = await UserModel.findById(id).lean<UserSchemaShape>();
    return user ? toUser(user) : null;
  },
  async findByName(name: string): Promise<User | null> {
    const user = await UserModel.findOne({ name }).lean<UserSchemaShape>();
    return user ? toUser(user) : null;
  },
  async findByNameWithPassword(name: string): Promise<User | null> {
    const user = await UserModel.findOne({ name }).select('+password').lean<UserSchemaShape>();
    return user ? toUser(user) : null;
  },
  async getAllUsers(): Promise<User[]> {
    const users = await UserModel.find().lean<UserSchemaShape[]>();
    return users.map((user: UserSchemaShape) => toUser(user));
  },
  async updateUser(id: string, name: string): Promise<User | null> {
    const user = await UserModel.findByIdAndUpdate(id, { name }).lean<UserSchemaShape>();
    return user ? toUser(user) : null;
  },
  async deleteUser(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  },
};

export function toUser(user: UserSchemaShape): User {
  return { id: user._id.toString(), name: user.name };
}
