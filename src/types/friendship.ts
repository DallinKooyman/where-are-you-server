// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Status } from './friendshipStatus.js';
import { User } from './user.js';

export interface Friendship {
  id: string;
  user: User;
  friend: User;
  status: Status;
  requesterId: string;
  createdAt: Date;
}

export interface CreateFriendshipInput {
  user: string;
  friend: string;
  requesterId: string;
}
