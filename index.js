require('dotenv').config();
const path = require('path');
// const logger = require('./logger');
const Botkit = require('botkit');

const logger = require(path.join(__dirname, 'logger'));

[
  'PORT',
  'NODE_ENV',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'CLIENT_SIGNING_SECRET',
  'VERIFICATION_TOKEN',
  'BOT_TOKEN',
  'WEBHOOK_URL'
].forEach(name => {
  if(!process.env[name]){
    const msg = `Environment variable ${name} is missing`;

    logger.error(msg);
    throw new Error(msg);
  }
})

const controller = Botkit.slackbot({
  json_file_store: './db_slackbutton_slash_command/',
  debug: process.env.NODE_ENV === 'production' ? 'false' : 'true',
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET
});

controller.configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,
  scopes: ['commands', 'bot', 'chat:write:bot', 'channels:read', 'im:read', 'incoming-webhook']
});

const bot = controller.spawn({
  token: process.env.BOT_TOKEN,
  incoming_webhook: {
    url: process.env.WEBHOOK_URL
  }
}).startRTM();

const PORT = process.env.PORT || 3000;
controller.setupWebserver(PORT, (err, webserver) => {
  controller.createOauthEndpoints(controller.webserver,
    (err, req, res) => {
      if (err) {
        logger.error(err);
        res.status(500).send(`Error: ${err}`);
      }

      res.send('Connected to Slack');
    });
});

// Our bot's skillset
const hears = require(path.join(__dirname, 'skills/hears'));
const convo = require(path.join(__dirname, 'skills/convo'));

hears(controller);
convo(controller);
