// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

export interface User {
  id: string; // MongoDB ObjectID
  name?: string;
  password?: string;
}

export interface CreateUserInput {
  name: string;
  password?: string;
}
