import { User } from './user.js';

export interface Friendship {
  id: string;
  user: User;
  friend: User;
  status: string;
  createdAt: Date;
}

export interface CreateFriendshipInput {
  userId: string;
  friendId: string;
}
