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
        `O tempo agora está ${body.currently.summary} e a temperatura é de ${body.currently.temperature} graus.
        Tem ${body.currently.precipProbability}% de chance de chover agora.
        Temperatura mínima: ${body.daily.data[0].temperatureLow}.
        Temperatura Máxima: ${body.daily.data[0].temperatureHigh}`
      );
    }
  });
};

module.exports = forecast;
