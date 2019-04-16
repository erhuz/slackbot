const logger = require('../logger');
const search = require('youtube-search');

module.exports = (controller) => {
  const options = {
    maxResults: 1,
    key: process.env.YOUTUBE_API_KEY
  }

  controller.hears(['^search (.*)'], 'direct_message,direct_mention', (bot, message) => {
    if (message.match[1]) {
      
      search(message.match[1], options, (err, results) => {
        
        if(err){
          logger.error(err);
        }

        console.dir(results[0].link);
        bot.reply(message, results[0].link);
        logger.info('Successfully searched');
        
      })
      
    }
  });
}