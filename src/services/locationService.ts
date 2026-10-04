import { kafka } from '../config/kafka.js';
import { Location, LocationChangeInput } from '../types/location.js';
import { LocationRespository } from '../data/locationRepository.js';
import { redisClient, redisSubscriber } from '../config/redis.js';
import { friendshipRepository } from '../data/friendshipRepository.js';
import { User } from '../types/user.js';

const consumer = kafka.consumer({ groupId: 'location-updates-group' });

let isRunning = false;

export const startLocationSaver = async () => {
  await consumer.connect();
  console.debug('Consumer connected');
  isRunning = true;

  await consumer.subscribe({ topic: 'location-updates' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!isRunning) return;
      try {
        if (!message.value) throw Error('Empty value in message');
        const location = JSON.parse(message.value.toString()) as LocationChangeInput;
        console.log('Received message:', location);

        const savedLocation = await LocationRespository.create(location);
        if (savedLocation) {
          publishLocationUpdate(savedLocation);
        }
      } catch (err) {
        console.error('Error processing message:', err);
      }
    },
  });
};

export const stopLocationSaver = async () => {
  isRunning = false;
  await consumer.disconnect();
};

async function publishLocationUpdate(location: Location) {
  const friends = await friendshipRepository.findByUser(location.user.id);

  if (!friends || friends.length == 0) {
    return;
  }

  for (const friend of friends) {
    redisClient.publish(`user:${friend.friend.id}:friendLocationChange`, JSON.stringify(location));
  }
}

async function subscribeToLocationUpdates(user: User) {
  const channel = `user:${user.id}:friendLocationChange`;

  await redisSubscriber.subscribe(channel, (message: string) => {
    const locationUpdate: Location = JSON.parse(message);
    console.debug(`Channel '${channel}' recieved a message: ${locationUpdate}`);
  });
}
