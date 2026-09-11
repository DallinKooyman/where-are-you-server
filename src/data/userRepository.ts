import { UserDoc, UserModel } from '../models/user.js';
import { User, CreateUserInput } from '../types/user.js';

export const userRepository = {
  async create(data: CreateUserInput): Promise<User> {
    const doc = await UserModel.create(data);
    return toUser(doc.toObject() as UserDoc);
  },
  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).lean<UserDoc>();
    return doc ? toUser(doc) : null;
  },
  async findByName(name: string): Promise<User | null> {
    const doc = await UserModel.findOne({ name }).lean<UserDoc>();
    return doc ? toUser(doc) : null;
  },
};

function toUser(doc: UserDoc): User {
  return { id: doc._id.toString(), name: doc.name };
}
