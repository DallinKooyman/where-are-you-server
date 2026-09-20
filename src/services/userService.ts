import { CreateUserInput, User } from '../types/user.js';
import { userRepository } from '../data/userRepository.js';

/**
 * Used to acces the User Repo
 * Currently this is overkill but may be expanded in the future
 */
export const userService = {
  async registerNewUser(data: CreateUserInput): Promise<User> {
    if (!data.name) throw new Error('Name required');

    const user = await userRepository.findByName(data.name);
    if (user) throw new Error('User exists');

    return await userRepository.create(data);
  },
  async getUserById(id: string): Promise<User | null> {
    return await userRepository.findById(id);
  },
  async getUserByName(data: User): Promise<User | null> {
    if (!data.name) throw new Error('Name required for this search');

    return await userRepository.findByName(data.name);
  },
  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  },
  async updateUser(id: string, name: string): Promise<User | null> {
    const user = await userRepository.findById(id);
    if (!user) return null;
    return await userRepository.updateUser(id, name);
  },
  async deleteUser(id: string): Promise<void> {
    await userRepository.deleteUser(id);
  },
};
