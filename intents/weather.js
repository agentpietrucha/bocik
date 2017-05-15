const forecast = require('forecast');
const fc = new forecast({
  service: 'darksky',
  key: '44280cb13ba426ae632f3235775ef8fc',
  units: 'celcius',
  cache: false
})

// fc.get([-33.8683, 151.2086], function(err, weather){
//     temp = weather.toString();
// })

const getWeather = function(lat, long, date, cb){
  fc.get([lat, long], function(err, weather){
    // return cb(weather.currently.temperature);
    var answ;
    if(date.toString().toLowerCase() === 'today'){
      answ = weather.hourly.summary + ' The temperature will hesitate around ' + Math.round(weather.hourly.data[0].temperature);
    } else if(date.toString().toLowerCase() === 'tomorrow'){
      answ = weather.daily.summary
    }

    return cb(answ);
  })
}

module.exports = getWeather
