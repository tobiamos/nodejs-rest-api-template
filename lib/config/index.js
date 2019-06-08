const testConfig = require('./test');
const productionConfig = require('./production');
const stagingConfig = require('./staging');
const config = require('./development');


// export environment level keys

if (process.env.NODE_ENV === 'test') {
  module.exports = Object.assign({ }, config, testConfig);
} else if (process.env.NODE_ENV === 'production') {
  module.exports = Object.assign({}, config, productionConfig);
} else if (process.env.NODE_ENV === 'staging') {
  module.exports = Object.assign({}, config, stagingConfig);
} else {
  module.exports = config;
}
