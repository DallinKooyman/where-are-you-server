import mongoose, { InferSchemaType } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, //Auto create for new Users
  },
  name: String,
});

export const UserModel = mongoose.model('User', userSchema);

type UserSchemaShape = InferSchemaType<typeof userSchema>;
export type UserDoc = Omit<UserSchemaShape, '_id'> & {
  _id: string;
  name: string;
  __v: number;
};
