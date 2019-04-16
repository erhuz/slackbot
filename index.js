require('dotenv').config();
const path = require('path');
// const logger = require('./logger');

const logger = require(path.join(__dirname, 'logger'));

[
  'PORT',
  'NODE_ENV',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'CLIENT_SIGNING_SECRET',
  'VERIFICATION_TOKEN',
  'BOT_TOKEN',
].forEach(name => {
  if(!process.env[name]){
    const msg = `Environment variable ${name} is missing`;

    logger.error(msg);
    throw new Error(msg);
  }
})

logger.debug('Console Only');
logger.info('Console and combined.log');
logger.error('All over');