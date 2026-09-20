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
