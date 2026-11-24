// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import express from 'express';
import { friendshipService } from '../services/friendshipService.js';
import { CreateFriendshipInput, Friendship } from '../types/friendship.js';
import {
  missingRequiredFriendshipUpdateInputs,
  missingRequiredFriendshipUserIds,
} from '../utils/responseUtils.js';
import { Status } from '../types/friendshipStatus.js';
import { FriendshipFilterType } from '../types/filterTypes.js';

const friendshipRoutes = express.Router();

friendshipRoutes.get('/', async (req, res) => {
  try {
    const filter = FriendshipFilterType.buildFriendshipFilter(req.query);
    //TODO: confirm there is something in the filter or default to the requesting user's friendships
    const friendships: Friendship[] = await friendshipService.getFriendshipsWithFilter(filter);
    res.status(200).json({ message: `Friendships`, friendships });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting friendships: ${err}` });
  }
});

friendshipRoutes.post('/', async (req, res) => {
  if (!req.body || !req.body.userId || !req.body.friendId) {
    return res.status(400).json(missingRequiredFriendshipUserIds);
  }
  try {
    const input = {
      user: req.body.userId,
      friend: req.body.friendId,
      requesterId: req.body.userId,
    } as CreateFriendshipInput;
    const friendship = await friendshipService.createFriendships(input);
    res.status(200).json({ message: `Friendship was created successfully`, friendship });
  } catch (err) {
    res.status(500).json({ error: `There was an error creating the friendship: ${err}` });
  }
});

friendshipRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const friendship = await friendshipService.getFriendshipById(id);
    if (friendship) {
      res.status(200).json({ message: `Retreived the friendship successfully`, friendship });
    }
    res.status(404).json({ message: `No friendship with the id: ${id}` });
  } catch (err) {
    res.status(500).json({ error: `There was an error getting the friendship: ${err}` });
  }
});

friendshipRoutes.put('/:id', async (req, res) => {
  if (
    !req.body ||
    !req.body.status ||
    Status[req.body.status as keyof typeof Status] === undefined
  ) {
    return res.status(400).json(missingRequiredFriendshipUpdateInputs);
  }
  const { id } = req.params;
  const status = Status[req.body.status as keyof typeof Status];
  try {
    const friendship = await friendshipService.updateFriendship(id, status);
    if (friendship) {
      res.status(200).json({ message: 'The friendship was updated.', friendship });
    } else {
      res.status(404).json({ message: `No friendship with id ${id} was found` });
    }
  } catch (err) {
    res.status(500).json({ error: `There was an error updating the friendship: ${err}` });
  }
});

friendshipRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await friendshipService.deleteFriendship(id);
    res.status(200).json({ message: `Friendship was deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: `There was an error when deleting the friendship: ${err}` });
  }
});

export default friendshipRoutes;
