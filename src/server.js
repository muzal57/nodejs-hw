import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import pino from 'pino-http';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat:
          '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

app.get('/notes/:noteId', (req, res) => {
  res
    .status(200)
    .json({ message: `Retrieved note with ID: ${req.params.noteId}` });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';
  res.status(500).json({ message: isProd ? 'Server Error' : err.stack });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
