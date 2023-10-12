const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

function addNewRecipe(){
  const newRecipe = {
    title: "Garlic Braised Short Ribs With Red Wine",
    level: "Amateur Chef",
    ingredients: ["Short Ribs", "Garlic", "Dry Red Wine Bottle", "Beef Stock"],
    cuisine: "International",
    dishType: "main_course",
    image: "https://static01.nyt.com/images/2017/12/16/dining/16COOKING-BRAISED-SHORTRIBS/16COOKING-BRAISED-SHORTRIBS-master768.jpg?w=1280&q=75",
    duration: 4.5,
    creator: "Alison Roman",
  }

  Recipe.create(newRecipe)
  .then(res => console.log(res))
  .catch((err) => console.log(err))
}

addNewRecipe();