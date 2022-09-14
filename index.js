require("dotenv").config();
const {
  readInput,
  pauseInq,
  inquirerMenu,
  listPlaces,
} = require("./helpers/inquirer");
const { printCityInfo } = require("./helpers/utils");
const { Searchs } = require("./models/searchs");

const main = async () => {
  let option = null;
  const searchs = new Searchs();
  searchs.readBd();

  do {
    option = await inquirerMenu();
    // read bd

    switch (option) {
      case 1:
        const place = await readInput("what place do you want to search ... ?");
        const placesInfo = await searchs.city(place);
        const placeIdSelect = await listPlaces(placesInfo); // select - get placeId
        const placeSelect = placesInfo.find(
          (place) => place.id === placeIdSelect
        );

        if (!placeSelect) continue; // avoid next lines and continue with the flow app
        searchs.saveHistorical(placeSelect.name); // save bd

        const weather = await searchs.weaterPlace(
          placeSelect.lat,
          placeSelect.lng
        );

        printCityInfo({
          ...placeSelect,
          desc: weather.desc,
          min: weather.min,
          max: weather.max,
          temp: weather.temp,
        });
        break;

      case 2:
        console.log("\n");
        searchs.historicalCapitalized.forEach((place, idx) => {
          const index = `${idx + 1 + "."}`.green;
          place;
          console.log(`${index}`, place);
        });
        break;
      default:
        break;
    }

    if (option !== 0) await pauseInq();
  } while (option !== 0);
};

main();
