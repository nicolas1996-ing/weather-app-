require("colors");
var cowsay = require("cowsay");

const printCityInfo = (city) => {
  console.log(
    cowsay.say({
      text: "\nInformation of the city\n",
    })
  );
  console.log("city".yellow, city?.name);
  console.log("desc".yellow, city?.desc);
  console.log("lat".yellow, city?.lat);
  console.log("long".yellow, city?.lng);
  console.log("temp".yellow, city?.temp);
  console.log("min".yellow, city?.min);
  console.log("max".yellow, city?.max);
};

module.exports = {
  printCityInfo,
};
