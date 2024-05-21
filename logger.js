import winston from 'winston';

const customLogger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    serviceName: 'express-logging-service',
    buildDetails: {
      nodeVersion: process.version,
      commitHash: process.env.COMMIT_HASH || 'local',
      appVersion: process.env.VERSION || '1.0.0'
    }
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ message, timestamp, level, serviceName, buildDetails, ...meta }) => {
          // Ignore serviceName and buildDetails when logging to the console
          return `${timestamp} ${level}: ${message} ${JSON.stringify(meta)}`;
        })
      )
    }),
    new winston.transports.File({
      filename: 'application.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

export default customLogger;
