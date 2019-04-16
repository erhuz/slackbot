const logger = require('../logger');

module.exports = (controller) => {
  controller.hears(['hello', 'hey', 'hi', 'oi'], 'direct_message,direct_mention', (bot, message) => {
    bot.api.users.info({
      user: message.user
    }, (err, res) => {
      if (err) {
        logger.error(err);
      }

      const { real_name } = res.user;

      bot.reply(message, `Hello ${real_name}!`);
    });
  });
  console.log(controller);
}