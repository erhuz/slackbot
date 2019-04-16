{/* <script src='https://apis.google.com/js/api.js'></script> */}


const logger = require('../logger');

module.exports = (controller) => {
  
  controller.hears(['^search (-*)'], 'direct_message,direct_mention', (bot, message) => {
    bot.api.users.info({
      user: message.user
    }, (err, res) => {
      if (err) {
        logger.error(err);
      }
      
      loadClient()
      .then(res => {
        // Search & retrieve youtube video
        execute('bamse')
        .then(res => {
          logger.info(`YOUTUBE RESPONSE: ${res}`);
        })
        .catch(err => logger.error(err));
      });
      
      
      
      const { real_name } = res.user;
      bot.reply(message, `Hello ${real_name}! Here is your youtube video:`);
    });
  });
  
  
  function loadClient() {
    gapi.client.setApiKey(process.env.YOUTUBE_API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
      .then(() => { console.log("GAPI client loaded for API"); },
        (err) => { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded before calling this method.
  function execute() {
    return gapi.client.youtube.search.list({
      "part": "id"
    })
      .then((response) => {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response);
      },
        (err) => { console.error("Execute error", err); });
  }
  gapi.load("client");
  
  // const loadClient = () => new Promise((resolve, reject) => {
  //   gapi.client.setApiKey(process.env.YOUTUBE_API_KEY);
  //   return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
  //     .then(() => {
  //       resolve('GAPI client loaded for API');
  //     }, (err) => {
  //       reject(err);
  //     });
  // });
  
  // const execute = (query) => new Promise((resolve, reject) => {
  //   return gapi.client.youtube.search.list({
  //     'part': 'id',
  //     'q': query
  //   })
  //     .then((response) => {
  //       console.log(response.result);
  //       resolve(response.result);
  //     }, (err) => {
  //       reject(err); 
  //     });
  // });
  
  // gapi.load('client');
}


{/* <button onclick='loadClient()'>load</button>
<button onclick='execute()'>execute</button> */}