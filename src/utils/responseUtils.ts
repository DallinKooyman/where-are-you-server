// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

export const missingRequiredUserName: object = {
  message: 'Missing required field',
  required: {
    name: {
      type: 'string',
      description: 'The name of the user',
    },
  },
};
export const missingLoginInputs: object = {
  message: 'Missing required field',
  required: {
    name: {
      type: 'string',
      description: 'The name of the user',
    },
    password: {
      type: 'string',
      description: 'The password of the user',
    },
  },
};

export const missingRequiredFriendshipUserIds: object = {
  message: 'Missing required fields',
  required: {
    userId: {
      type: 'string',
      description: 'The Id of the user',
    },
    friendId: {
      type: 'string',
      description: 'The Id of the friend',
    },
  },
};

export const missingRequiredFriendshipUpdateInputs: object = {
  message: 'Missing required fields',
  required: {
    status: {
      type: 'string',
      description: "The new status of the friendship. Must be 'Pending', 'Active' or 'Blocked'",
    },
  },
};

export const missingRequiredLocationChangeInputs: object = {
  message: 'Missing Required fields',
  required: {
    userId: {
      type: 'string',
      decsriptions: 'The id of the user that had the location change',
    },
    position: {
      latitude: {
        type: 'number',
        description: 'The latitude the user is now at',
      },
      longitude: {
        type: 'number',
        description: 'The longitude the user is now at',
      },
    },
    time: {
      type: 'string',
      description: 'The time of location change. Format: YYYY-MM-ddThh:mm V',
    },
  },
};
