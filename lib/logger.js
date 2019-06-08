const bunyan = require('bunyan');
const config = require('./config');

module.exports = bunyan.createLogger({
  name: 'generic-template',
  level: config.logger.level,
});
