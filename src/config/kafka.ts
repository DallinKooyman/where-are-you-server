// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  clientId: 'where-are-you-server',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

export const producer = kafka.producer();

export const initializeKafka = async () => {
  try {
    const admin = kafka.admin();
    await admin.connect();

    // Only create Topics that don't exist
    // Default values are acceptable
    await admin.createTopics({
      topics: [
        {
          topic: 'location-updates',
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
