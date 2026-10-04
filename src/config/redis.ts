import redis from 'redis';

const redisClient = redis.createClient({ url: process.env.MONGO_URL || 'localhost:6379' });
const redisSubscriber = redis.createClient({
  url: process.env.MONGO_URL || 'localhost:6379',
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

redisSubscriber.on('connect', () => {
  console.log('Redis subscriber connected');
});

redisSubscriber.on('error', (err) => {
  console.error('Redis subscriber error:', err);
});

export const initializeRedis = async () => {
  try {
    await redisClient.connect();
    console.debug('Redis Client is ready to publish messages');

    await redisSubscriber.connect();
    console.debug('Redis Sub is ready to sub to messages');
  } catch (err) {
    console.error('Redis failed to initialize: ', err);
  }
};

export { redisClient, redisSubscriber };
