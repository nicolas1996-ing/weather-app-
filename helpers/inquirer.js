const inquirer = require("inquirer");
const colors = require("colors");
require("colors");

// group 1
const questions = [
  {
    type: "list", // define by inquirer
    name: "opcion", // return
    message: "¿What do you like to do?\n",
    choices: [
      {
        value: 1,
        name: `${"1.".green}  search city`,
      },
      {
        value: 2,
        name: `${"2.".green}  historical`,
      },
      {
        value: 0,
        name: `${"0.".green}  exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  menuDecription();
  const { opcion } = await inquirer.prompt(questions);
  return opcion; // retorna el value asociado al choice
};

// group 2
const listPlacesOptions = (places = []) => {
  let choices = [];
  places.forEach((place, i) => {
    choices.push({
      value: place.id,
      name: `${colors.green(i + 1 + ".")}${place.name}`,
    });
  });

  const placesList = {
    type: "list", // define by inquirer
    name: "placeId", // return
    message: "Select place ... \n",
    choices: [...choices, { value: "0", name: `${colors.green("0.")} cancel` }],
  };

  return placesList;
};

const listPlaces = async (places = []) => {
  menuDecription();
  const { placeId } = await inquirer.prompt(listPlacesOptions(places));
  return placeId;
};

// group 3
const listTaskToMarkedAsCompleted = (tasks = []) => {
  let choices = [];
  tasks.forEach((task, i) => {
    choices.push({
      value: task.id,
      name: `${colors.green(i + 1 + ".")}${task.description}`,
      checked: task.completed === null ? false : true,
    });
  });

  const tasksList = {
    type: "checkbox", // define by inquirer
    name: "ids", // return
    message: "Select tasks to delete ... \n",
    choices,
  };

  return tasksList;
};

const listTaskMarkedAsFinish = async (tasks = []) => {
  menuDecription();
  const { ids } = await inquirer.prompt(listTaskToMarkedAsCompleted(tasks));
  return ids;
};

// group 4. generals
const pauseInq = async () => {
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: `Push ${"ENTER".green} to continued `,
    },
  ]);
};

const messageConfirmation = async (message) => {
  const question = {
    type: "confirm",
    name: "confirmation",
    message,
  };

  const { confirmation } = await inquirer.prompt(question);
  return confirmation;
};

const readInput = async (message) => {
  const question = {
    type: "input",
    name: "desc",
    message,
    validate(value) {
      // validación para evitar inputs nulos
      if (value.length === 0) return "Please type a value valid";
      return true;
    },
  };

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const menuDecription = () => {
  console.clear();
  console.log("===============================".green);
  console.log("       select an option".white);
  console.log("=============================== \n".green);
};

module.exports = {
  inquirerMenu,
  pauseInq,
  readInput,
  messageConfirmation,
  listTaskMarkedAsFinish,
  listPlaces,
};
