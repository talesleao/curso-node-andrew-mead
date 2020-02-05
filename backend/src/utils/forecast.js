const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/1a2ac26c94a526168b154259f689d614/${lat},${long}?lang=pt&units=si`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(
        undefined,
        `It is currently ${body.currently.summary} and the temperature is ${body.currently.temperature} degrees. There is a ${body.currently.precipProbability}% chance to rain.`
      );
    }
  });
};

module.exports = forecast;
