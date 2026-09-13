import express from 'express';
import { createServer } from 'http';
import { initializeKafka } from './config/kafka.js';
import { initializeMongoDB } from './config/mongodb.js';
import userRoutes from './routes/userRoutes.js';

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

httpServer.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});
