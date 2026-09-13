import { FriendshipModel, FriendshipPopulated } from '../models/friendship.js';
import { CreateFriendshipInput, Friendship } from '../types/friendship.js';
import { toUser } from './userRepository.js';

export const friendshipRepository = {
  async create(data: CreateFriendshipInput): Promise<Friendship> {
    const doc = await FriendshipModel.create({
      user: data.userId,
      friend: data.friendId,
    });

    const friendship = await this.findById(doc._id!.toString());
    if (!friendship) {
      throw new Error(
        `Failed to retrieve newly created friendship with id: ${doc._id?.toString}\n` +
          `with user: ${data.userId}\n` +
          `and friend: ${data.friendId}`
      );
    }
    return friendship;
  },
  async findById(id: string): Promise<Friendship | null> {
    const doc = await FriendshipModel.findById(id)
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated>();
    return doc ? toFriendship(doc) : null;
  },
  async findByUser(userId: string): Promise<Friendship[] | null> {
    const docs = await FriendshipModel.find({ user: userId })
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated[]>();
    return docs.map((doc: FriendshipPopulated) => toFriendship(doc));
  },
  async findByUserAndFriend(userId: string, friendId: string): Promise<Friendship | null> {
    const doc = await FriendshipModel.find({ user: userId, friend: friendId })
      .populate('user')
      .populate('friend')
      .lean<FriendshipPopulated>();
    return doc ? toFriendship(doc) : null;
  },
  async findByUserAndStatus(userId: string, status: string): Promise<Friendship[] | undefined> {
    const friendships = await this.findByUser(userId);
    return friendships?.filter((friendship) => status === friendship.status);
  },
};

function toFriendship(doc: FriendshipPopulated): Friendship {
  return {
    id: doc._id!.toString(),
    user: toUser(doc.user),
    friend: toUser(doc.friend),
    status: doc.status,
    createdAt: doc.createdAt,
  };
}
