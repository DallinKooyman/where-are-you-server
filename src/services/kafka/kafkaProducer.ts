import { producer } from '../../config/kafka.js';

export const publishUpdate = async () => {
  try {
    await producer.send({
      topic: 'first',
      messages: [
        {
          value: 'Test Message',
        },
      ],
    });
    console.debug('Message Sent');
  } catch (err) {
    console.error('Message was not sent: ', err);
  }
};
