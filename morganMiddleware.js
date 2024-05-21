import morgan from 'morgan';
import customLogger from './logger.js';

const logFormat = `
{
    "httpMethod": ":method",
    "requestUrl": ":url",
    "responseStatus": ":status",
    "responseTime": ":response-time ms"
}`;

function logMessageHandler(message) {
  customLogger.info('HTTP request received', JSON.parse(message.trim()));
}

const loggingMiddleware = morgan(
  logFormat,
  {
    stream: { write: logMessageHandler }
  }
);

export default loggingMiddleware;
