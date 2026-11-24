// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Status } from './friendshipStatus.js';

export class FriendshipFilterType {
  userId?: string;
  friendId?: string;
  status?: string;
  static buildFriendshipFilter = (params: Record<string, any> | undefined) => {
    const filter: Record<string, any> = {};
    if (params?.userId) filter.user = params.userId;
    if (params?.friendId) filter.friend = params.friendId;
    if (params?.status) {
      filter.status = Status[params.status as keyof typeof Status];
    }

    return filter;
  };
}
