const { createLogger, format, transports } = require('winston');

function logger() {
  const winston = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.errors({ stack: true }),
      format.json(),
    ),
    transports: [
      new transports.File({
        filename: 'error.log',
        level: 'error',
      }),
      new transports.File({
        filename: 'request.log',
        level: 'info',
      }),
    ],
    exceptionHandlers: [
      new transports.File({
        filename: 'exceptions.log',
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
      handleExceptions: true,
    }));
  }

  return winston;
}

module.exports = logger();
