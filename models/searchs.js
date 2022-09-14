const fs = require("fs");
const { default: axios } = require("axios");
const TOKEN = process.env.TOKEN_MAPBOX;
const TOKEN_OPEN_WEATHER = process.env.TOKEN_OPEN_WEATHER;
const URL_BASE_MAPBOX = process.env.URL_BASE_MAPBOX;
const URL_BASE_OPEN_WEATHER = process.env.URL_BASE_OPEN_WEATHER;

class Searchs {
  historical = [];
  pathDb = "./database/database.json"; // bd

  constructor() {}

  get paramsMapBox() {
    return `?limit=5&language=es&types=place%2Cpostcode%2Caddress&access_token=${TOKEN}`;
  }

  get historicalCapitalized() {
    return this.historical.map((place) => place.toUpperCase());
  }

  async city(place = "") {
    try {
      const url_fetch = `${URL_BASE_MAPBOX}${place}.json${this.paramsMapBox}`;
      const {
        data: { features: infoCountries },
      } = await axios.get(url_fetch);

      // data map
      return infoCountries.map((country) => ({
        id: country.id,
        name: country.place_name,
        lng: country.center[0],
        lat: country.center[1],
      }));
    } catch (error) {
      // throw new Error(error); // se quiebra toda la aplicación
      return []; // evita que la app se quiebre y sigue su flujo normal
    }
  }

  async weaterPlace(lat, lng) {
    try {
      const { data } = await axios.get(
        `${URL_BASE_OPEN_WEATHER}?lat=${lat}&lon=${lng}&appid=${TOKEN_OPEN_WEATHER}&units=metric`
      );

      const weatherDescr = data.weather[0];
      const weaterPlace = data.main;

      return {
        desc: weatherDescr.description,
        min: weaterPlace?.temp_min,
        max: weaterPlace?.temp_max,
        temp: weaterPlace?.temp,
      };
    } catch (error) {
      return error;
    }
  }

  saveHistorical(place = "") {
    !this.historical.includes(place.toLocaleLowerCase())
      ? this.historical.unshift(place.toLocaleLowerCase())
      : null;

    // save bd
    const payload = {
      historical: this.historical,
    };
    fs.writeFileSync(this.pathDb, JSON.stringify(payload));
  }

  readBd() {
    // validate path
    if (fs.existsSync(this.pathDb)) {
      const data = JSON.parse(
        fs.readFileSync(this.pathDb, { encoding: "utf-8" })
      ); // read
      if (data) this.historical = data.historical;
    }
  }
}

module.exports = {
  Searchs,
};

// example request http
// const url = "https://reqres.in/api/users?page=2";
// const {
//   data: { data: resp },
// } = await axios.get(url);
