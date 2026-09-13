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
  async getUserById(data: User): Promise<User | null> {
    if (!data.id) throw new Error('ID required for this search');

    return await userRepository.findById(data.id);
  },
  async getUserByName(data: User): Promise<User | null> {
    if (!data.name) throw new Error('Name required for this search');

    return await userRepository.findByName(data.name);
  },
  async getAllUsers(): Promise<User[]> {
    return await userRepository.getAllUsers();
  },
};
