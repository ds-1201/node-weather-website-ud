const request = require("request");

const geocode = (address, callBack) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiZHMxMjAxIiwiYSI6ImNrb3N1YmFycjA0Yzkyd3BkaG1qamhsajYifQ.EwJgOBNDqgHnRIvlwhQfwg&limit=1";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callBack("Cannot connect to geocode service!!!", undefined);
    } else if (response.body.features.length === 0) {
      callBack("Unable to find location.Try another search", undefined);
    } else {
      const data = response.body.features[0];
      const longtitude = data.center[0];
      const latitude = data.center[1];
      const place_name = data.place_name;
      const results = {
        latitude: latitude,
        longtitude: longtitude,
        place_name: place_name,
      };
      callBack(undefined, results);
    }
  });
};

module.exports = geocode;
