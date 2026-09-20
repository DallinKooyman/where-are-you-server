import mongoose, { InferSchemaType, Schema } from 'mongoose';
import { Position } from '../types/position.js';
import { UserSchemaShape } from './user.js';

const locationSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  position: { type: Position, ref: 'Position', required: true },
  time: { type: Date, default: Date.now, required: true, index: true },
  createdAt: { type: Date, default: Date.now },
});

export const LocationModel = mongoose.model('Locaiton', locationSchema);

export type LocationSchemaShape = InferSchemaType<typeof locationSchema>;

export interface LocationPopulated {
  _id: string;
  user: UserSchemaShape;
  position: Position;
  time: Date;
  createdAt: Date;
}
