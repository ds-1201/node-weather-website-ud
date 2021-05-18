const request = require("request");

const forecast = (long, lat, callBack) => {
  const weatherUrl =
    "http://api.weatherstack.com/current?access_key=16abc24f50e39d0d34c75ba3c45517c7&query=" +
    encodeURIComponent(lat) +
    "," +
    encodeURIComponent(long);

  request({ url: weatherUrl, json: true }, (error, response) => {
    if (error) {
      callBack("Cannot connect to weather service!!!", undefined);
    } else if (response.body.error) {
      callBack("No search results found.Try another search", undefined);
    } else {
      const current = response.body.current;
      results = {
        description: current.weather_descriptions[0],
        temperature: current.temperature,
        feelslike: current.feelslike,
      };
      callBack(undefined, results);
    }
  });
};

module.exports = forecast;
