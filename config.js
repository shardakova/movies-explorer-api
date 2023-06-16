require('dotenv').config();

const config = {
  SERVER_HOST: process.env.SERVER_HOST || 'localhost',
  SERVER_PORT: process.env.SERVER_PORT || '3000',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET: process.env.JWT_SECRET || 'KEEPITSECURE',
};

module.exports = config;
