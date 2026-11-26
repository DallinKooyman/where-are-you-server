// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { CreateUserInput, User } from '../types/user.js';
import { userRepository } from '../data/userRepository.js';
import argon2 from 'argon2';

/**
 * Used to acces the User Repo
 * Currently this is overkill but may be expanded in the future
 */
export const userService = {
  async registerNewUser(data: CreateUserInput): Promise<User> {
    const user = await userRepository.findByName(data.name);
    if (user) throw new Error('User exists');

    return await userRepository.create(data);
  },
  async getUserById(id: string): Promise<User | null> {
    return await userRepository.findById(id);
  },
  async getUserByName(data: User): Promise<User | null> {
    if (!data.name) throw new Error('Name required for this search');

    return await userRepository.findByName(data.name);
  },
  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  },
  async updateUser(id: string, name: string): Promise<User | null> {
    const user = await userRepository.findById(id);
    if (!user) return null;
    return await userRepository.updateUser(id, name);
  },
  async deleteUser(id: string): Promise<void> {
    await userRepository.deleteUser(id);
  },
  async login(name: string, password?: string): Promise<User | string> {
    const user = await userRepository.findByNameWithPassword(name);
    if (!user) return 'Name did not match any user';

    // If no user.password and no password then log the user in
    let isPasswordCorrect = true;

    // If the user had a stored password, we must check for it.
    if (user.password) {
      // The hashed password must be first
      isPasswordCorrect = password ? await argon2.verify(user.password, password) : false;
    }
    // If a password was passed in, then check against stored password. If there is no stored password the don't log in
    else if (password) {
      isPasswordCorrect = user.password ? await argon2.verify(user.password, password) : false;
    }
    if (isPasswordCorrect) {
      return user;
    } else {
      return 'Passowrd is incorrect'; //TODO Update in the future to be a true error message (like a status code)
    }
  },
};
