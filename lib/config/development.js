
module.exports = {
  mongo: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/development',
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  logger: {
    level: 'error',
  },
  baseUrl: 'http://localhost:9700',
  port: 9700,
};
