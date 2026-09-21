import { producer } from '../../config/kafka.js';
import { LocationChangeInput } from '../../types/location.js';

export const publishLocationUpdate = async (message: LocationChangeInput) => {
  await producer.send({
    topic: 'location-update',
    messages: [
      {
        key: message.user,
        value: JSON.stringify(message),
      },
    ],
  });
};
