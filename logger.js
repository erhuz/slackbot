const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize, simple } = format;

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    printf(info => `${info.timestamp} ${info.level} ${info.message}`)
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `combined.log` 
      // - Write all logs error (and below) to `error.log`.
      //
      new transports.Console({
        level: 'debug',
        format: combine(
          colorize(),
          
          format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message}`
            )
            )
          }),
          new transports.File({
            filename: 'logs/error.log',
            level: 'error'
          }),
          new transports.File({
            filename: 'logs/combined.log',
            level: 'info'
          }),
        ]
      });
      
      process.on('uncaughtException', error => {
        logger.error(`Uncaught exception: ${error}`);
      })
      
      //
      // If we're not in production then log to the `console` with the format:
      // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
      // 
      if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
          format: simple()
        }));
      }
      
      module.exports = logger;
      
      /*
      * Logs with level debug should be printed to the console.
      * Logs with level info should be written to a file called combined.log.
      * Logs with level error should be written to a file called error.log.
      */