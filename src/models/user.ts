import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: String,
});

export const UserModel = mongoose.model('User', userSchema);

export interface UserSchemaShape {
  _id: string; // MongoDB ObjectId
  name: string;
}
