export const missingRequiredUserName: object = {
  message: 'Missing required field',
  required: {
    name: {
      type: 'string',
      description: 'The name of the user',
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
