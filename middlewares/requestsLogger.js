const logger = require('../utils/logger');

function requestsLogger(req, res, next) {
  req.on('error', (err) => {
    logger.error(err);
  });
  res.on('close', () => {
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket.remoteAddress;
    const logMessage = `${ip} "${req.method} ${req.url}" ${res.statusCode} ${req.headers['user-agent']}`;
    if (/2\d{2}/.test(res.statusCode)) {
      logger.info(logMessage);
    } else {
      logger.error(logMessage);
    }
  });
  next();
}

module.exports = requestsLogger;
