import express from 'express';
import { createServer } from 'http';
import { initializeKafka, producer } from './config/kafka.js';
import { initializeMongoDB } from './config/mongodb.js';
import eventRoutes from './routes/eventRoutes.js';
import friendshipRoutes from './routes/friendshipRoutes.js';
import userRoutes from './routes/userRoutes.js';
import {
  startLocationSaver,
  stopLocationSaver,
} from './services/kafka/kafkaConsumer.ts/locationSaver.js';

const PORT = process.env.port || 1313;
const app = express();
const httpServer = createServer(app);

app.use(express.json());

// Connect to Mongo
initializeMongoDB();

// Start Kafka
initializeKafka();

app.get('/', (req, res) => {
  res.send('<h1>Hello There!</h1><p>This shows that the server is working!</p>');
});

app.get(['/ping', '/health'], (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/users', userRoutes);
app.use('/friendships', friendshipRoutes);
app.use('/events', eventRoutes);

httpServer.listen(PORT, async () => {
  await producer.connect();
  await startLocationSaver();
  console.log(`Backend running on port ${PORT}`);
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down gracefully...');
  await producer.disconnect();
  await stopLocationSaver();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await producer.disconnect();
  await stopLocationSaver();
  process.exit(0);
});
