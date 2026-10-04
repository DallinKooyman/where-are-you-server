import { LocationModel, LocationPopulated } from '../models/location.js';
import { LocationChangeInput, Location } from '../types/location.js';
import { User } from '../types/user.js';
import { toUser } from './userRepository.js';

export const LocationRespository = {
  async create(data: LocationChangeInput): Promise<Location | null> {
    const doc = await LocationModel.create(data);
    return await this.findById(doc.id);
  },
  async findById(id: string): Promise<Location | null> {
    const location = await LocationModel.findById(id)
      .populate('user')
      .populate('position')
      .lean<LocationPopulated>();
    return location ? toLocation(location) : null;
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
