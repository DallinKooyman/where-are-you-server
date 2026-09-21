import { producer } from '../../config/kafka.js';

export async function sendMessage(topic: string, key: string, value: string) {
  await producer.send({
    topic: topic,
    messages: [
      {
        key: key,
        value: value,
      },
    ],
  });
}
