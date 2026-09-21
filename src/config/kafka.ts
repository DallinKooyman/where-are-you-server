import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'where-are-you-server',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const producer = kafka.producer();

export const initializeKafka = async () => {
  try {
    await producer.connect();
    console.debug('Producer Online');

    const admin = kafka.admin();
    await admin.connect();

    // Only create Topics that don't exist
    // Default values are acceptable
    await admin.createTopics({
      topics: [
        {
          topic: 'location-update',
        },
      ],
    });

    await admin.disconnect();

    //Add consumers
    console.debug('Kafka is ready');
  } catch (err) {
    console.error('Kafka failed to initalize: ', err);
  }
};
