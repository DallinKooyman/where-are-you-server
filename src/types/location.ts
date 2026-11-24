// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Position } from './position.js';
import { User } from './user.js';

export interface Location {
  id: string;
  user: User;
  position: Position;
  time: Date;
  createdAt: Date;
}

export interface LocationChangeInput {
  user: string;
  position: { lat: number; lon: number };
  time: Date;
}
