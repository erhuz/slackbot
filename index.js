const dotenv = require('dotenv').config();
const logger = require('./logger');

logger.info('This is sent to a combined.log file');
logger.error('This is sent to a error.log file');