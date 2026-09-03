import express from 'express';
import { createServer } from 'http';
import { initializeKafka } from './config/kafka.js';

const PORT = process.env.port || 1313;
const app = express();
const httpServer = createServer(app);

app.use(express.json());

// Start Kafka
initializeKafka();

app.get('/', (req, res) => {
  res.send('<h1>Hello There!</h1><p>This shows that the server is working!</p>');
});

httpServer.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`WebSocket server listening on ws://localhost:${PORT}`);
});
