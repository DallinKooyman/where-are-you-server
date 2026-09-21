import { kafka } from '../../../config/kafka.js';
import { LocationChangeInput } from '../../../types/location.js';
import { LocationRespository } from '../../../data/locationRepository.js';

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

        await LocationRespository.create(location);
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
