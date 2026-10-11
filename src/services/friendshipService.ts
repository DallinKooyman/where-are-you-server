import { friendshipRepository } from '../data/friendshipRepository.js';
import { FriendshipFilterType } from '../types/filterTypes.js';
import { CreateFriendshipInput, Friendship } from '../types/friendship.js';
import { Status } from '../types/friendshipStatus.js';

export const friendshipService = {
  async getFriendships(): Promise<Friendship[]> {
    return await friendshipRepository.getAllFriendships();
  },
  async createFriendships(data: CreateFriendshipInput): Promise<Friendship> {
    const reverseFrienshipInput = {
      user: data.friend,
      friend: data.user,
      requesterId: data.requesterId,
    } as CreateFriendshipInput;
    return await friendshipRepository.create([data, reverseFrienshipInput]);
  },
  async getFriendshipsWithFilter(filter: FriendshipFilterType): Promise<Friendship[]> {
    return await friendshipRepository.findByFilter({ filter });
  },
  async getFriendshipById(id: string): Promise<Friendship | null> {
    return await friendshipRepository.findById(id);
  },
  async getFriendshipsByUser(userId: string): Promise<Friendship[]> {
    return await friendshipRepository.findByUser(userId);
  },
  async getFriendshipByUserAndFriend(userId: string, friendId: string): Promise<Friendship | null> {
    return await friendshipRepository.findByUserAndFriend(userId, friendId);
  },
  async updateFriendship(id: string, status: Status): Promise<Friendship | null> {
    const friendship = await friendshipRepository.findById(id);
    if (!friendship) return null;
    await friendshipRepository.updateFriendshipStatus(
      friendship.user.id,
      friendship.friend.id,
      status
    );
    return await friendshipRepository.findById(id);
  },
  async deleteFriendship(id: string): Promise<void> {
    const friendship = await friendshipRepository.findById(id);
    if (!friendship) return;
    await friendshipRepository.deleteFriendship(friendship.user.id, friendship.friend.id);
    return;
  },
};
