// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import express from 'express';
import { userService } from '../services/userService.js';
import { missingRequiredUserName } from '../utils/responseUtils.js';
import argon2 from 'argon2';

const userRoutes = express.Router();

userRoutes.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ message: `User List`, users });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the users: ${err}` });
  }
});

userRoutes.post('/', async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json(missingRequiredUserName);
  }
  const name = req.body.name;
  const password = req.body.password ? await argon2.hash(req.body.password) : undefined;
  try {
    const user = await userService.registerNewUser({ name, password });
    res.status(200).json({ message: `User was created successfully`, user });
  } catch (err) {
    res.status(500).json({ error: `There was an error creating a user: ${err}` });
  }
});

userRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      res.status(404).json({ message: `No user with the id: ${id}` });
    }
    res.status(200).json({ message: 'Successfully retrieved the user', user });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the user: ${err}` });
  }
});

userRoutes.put('/:id', async (req, res) => {
  if (!req.body || !req.body.name) {
    return res.status(400).json(missingRequiredUserName);
  }
  const name = req.body.name;
  const { id } = req.params;
  try {
    const user = await userService.updateUser(id, name);
    if (!user) {
      res.status(404).json({ message: `No user with the id: ${id}` });
    }
    res.status(200).json({ message: 'Successfully retrieved the user', user });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the user: ${err}` });
  }
});

userRoutes.delete(':id', async (req, res) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(id);
    res.status(200).json({ message: `User was deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: `There was an error when deleting the user: ${err}` });
  }
});

userRoutes.post('/login', async (req, res) => {
  if (!req.body || !req.body.name || !req.body.password) {
    return res.status(400).json(missingRequiredUserName);
  }
  const name = req.body.name;
  const password = req.body.password ? await argon2.hash(req.body.password) : undefined;
  try {
    const user = await userService.login(name, password);
    if (typeof user === 'string') {
      res.status(403).json({ message: user });
    }
    res.status(200).json({ message: `User was created successfully`, user });
  } catch (err) {
    res.status(500).json({ error: `There was an error creating a user: ${err}` });
  }
});

export default userRoutes;
