import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { UserSchemaShape } from './user.js';

const friendshipSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  friend: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  status: { type: String, enum: ['pending', 'active', 'blocked'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export const FriendshipModel = mongoose.model('Friendship', friendshipSchema);

export type FriendshipSchemaShape = InferSchemaType<typeof friendshipSchema>;

export interface FriendshipPopulated {
  _id: string;
  user: UserSchemaShape;
  friend: UserSchemaShape;
  status: 'pending' | 'active' | 'blocked';
  createdAt: Date;
}
