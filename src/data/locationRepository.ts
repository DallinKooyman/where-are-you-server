import { LocationModel, LocationPopulated } from '../models/location.js';
import { LocationChangeInput, Location } from '../types/location.js';
import { User } from '../types/user.js';
import { toUser } from './userRepository.js';

export const timelineRespository = {
  async create(data: LocationChangeInput): Promise<void> {
    LocationModel.create(data);
  },
  async findByUser(user: User): Promise<Location[]> {
    const locations = await LocationModel.find({ user: user.id })
      .populate('user')
      .populate('postion')
      .lean<LocationPopulated[]>();
    return locations.map((location: LocationPopulated) => toLocation(location));
  },
  async findByTime(start: Date, end: Date): Promise<Location[]> {
    const locations = await LocationModel.find({
      $and: [{ time: { $gte: start } }, { time: { $lte: end } }],
    })
      .sort({ date: -1 })
      .populate('user', 'postion')
      .lean<LocationPopulated[]>();
    return locations.map((location: LocationPopulated) => toLocation(location));
  },
  async deleteLocation(id: string): Promise<void> {
    LocationModel.findByIdAndDelete(id);
  },
};

function toLocation(location: LocationPopulated): Location {
  return {
    id: location._id!.toString(),
    user: toUser(location.user),
    position: location.position,
    time: location.time,
    createdAt: location.createdAt,
  };
}
