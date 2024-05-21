import express from 'express';
import morganMiddleware from './morganMiddleware.js';
import logger from './logger.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const SERVER_PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.post('/trigger-error', (req, res) => {
  logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  res.status(500).send('An error has been triggered.');
});

app.post('/trigger-success', (req, res) => {
  logger.info(`Request received: ${req}`);
  res.status(200).send('Operation completed successfully.');
});

app.get('/', (req, res) => {
  const responseMessage = 'Hello World!';
  logger.debug(`Response Message: ${responseMessage}`);
  res.status(200).send(responseMessage);
});

app.get('/error', (req, res) => {
  throw new Error('The error route has been triggered!');
});

app.use((err, req, res, next) => {
  logger.error(`Error Message: ${err.message}`, { error: err, stackTrace: err.stack });
  res.status(500).send('An unexpected error occurred.');
});

app.listen(SERVER_PORT, () => {
  logger.info('Server is up and running', { port: SERVER_PORT });
});
