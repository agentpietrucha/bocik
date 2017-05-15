const config = require('./config.js');
const restify = require('restify');
const builder = require('botbuilder');
const server = restify.createServer();
const recastai = require('recastai');
const recastClient = new recastai.default(config.recast);
const req = recastClient.request;
const getGreetings = require('./intents/greetings.js');
const getGoodbye = require('./intents/goodbye.js');
const getWeather = require('./intents/weather.js');
const getThanks = require('./intents/thanks.js')
// const recastClient = new recast.Client(config.recast);
//connection to microsoft bot server
const connector = new builder.ChatConnector({
  appId: config.appId,
  appPassword: config.appPassword,
})
const bot = new builder.UniversalBot(connector);

const INTENTS = {
  'greetings': getGreetings(),
  'goodbye': getGoodbye(),
  'say-thanks': getThanks(),
  // 'weather': getWeather(function(data){return data;}),
}
const weather = {
  time: '',
  location: {
    lat: 0,
    lng: 0,
  },
}
//when message received
bot.dialog('/', (session) => {
  console.log('Message: ', session.message.text);
  req.analyseText(session.message.text)
  .then(res => {
    const intent = res.intent();
    console.log('Intent: ', intent);
    console.log('Location: ', res.entities.location);
    if(intent.slug === 'location'){
      weather.location.lat = res.entities.location[0].lat;
      weather.location.lng = res.entities.location[0].lng;
      session.send('For today or tomorrow?')
    }
    if(intent.slug === 'date'){
      weather.time = res.entities.datetime[0].raw;
      getWeather(weather.location.lat, weather.location.lng, weather.time, function(data){
        var answ = data.toString();
        session.send(answ);
        cleanWeatherObject();
      })
    }
    if(intent.slug === 'weather'){
      if(res.entities.location !== undefined){
        getWeather(res.entities.location[0].lat, res.entities.location[0].lng, 'today',function(data){
          // var answ = 'The temperature in ' + res.entities.location[0].formatted + ' is about ' + Math.round(data).toString() + ' °C';
          var answ = data.toString();
          session.send(answ);
        })

      } else{
        session.send('Where?');

      }
    }else if(intent){
      session.send(INTENTS[intent.slug])
    }
  })
  .catch((data) => {
    console.log('ERROR: ', data);
    session.send('Unfortunately I do not understand everything yet. My creator is working on it :D')
    })
})
server.listen(8080);
server.post('/', connector.listen());
// server.get('/', connector.listen());
function cleanWeatherObject(){
  const weather = {
    time: '',
    location: {
      lat: 0,
      lng: 0,
    },
  }
}
