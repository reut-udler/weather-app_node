const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=13bbf3b9e1c2f69f1c623a9fceaa89a1&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to conect the weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,

        "The weather today is " +
          body.current.weather_descriptions +
          ". it is " +
          body.current.temperature +
          " degreess out. it's feels like " +
          body.current.feelslike +
          " degreess. wind speed is " +
          body.current.wind_speed
      );
    }
  });
};

module.exports = forecast;
