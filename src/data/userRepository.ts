import { UserModel, UserSchemaShape } from '../models/user.js';
import { User, CreateUserInput } from '../types/user.js';

export const userRepository = {
  async create(data: CreateUserInput): Promise<User> {
    const doc = await UserModel.create(data);
    const user = await this.findByName(data.name);
    if (!user) {
      throw new Error(
        `Failed to retrieve newly created user with id: ${doc._id?.toString} \n and name: ${doc.name}`
      );
    }
    return user;
  },
  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id).lean<UserSchemaShape>();
    return doc ? toUser(doc) : null;
  },
  async findByName(name: string): Promise<User | null> {
    const doc = await UserModel.findOne({ name }).lean<UserSchemaShape>();
    return doc ? toUser(doc) : null;
  },
  async getAllUsers(): Promise<User[]> {
    const docs = await UserModel.find().lean<UserSchemaShape[]>();
    return docs.map((doc: UserSchemaShape) => toUser(doc));
  },
};

export function toUser(doc: UserSchemaShape): User {
  return { id: doc._id.toString(), name: doc.name };
}
