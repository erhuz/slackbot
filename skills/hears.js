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

      bot.reply(message, `Hello ${message.text} ${real_name}!`);
    });
  });

  controller.hears(['^say (-*)'], 'direct_message,direct_mention', (bot, message) => {
    if (message.macth[1]) {
      bot.reply(message, message.macth[1]);
    }
  });

  controller.hears('test webhook', 'direct_message', (bot, message) => {
    bot.sendWebhook({
      text: `I'm replying through a webhook`
    }, (err) => {
      logger.error(err);
    })
  })
}