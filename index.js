const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title: "Tiarmisu",
      level: "Amateur Chef",
      ingredients:["eggs","sugar","ladyfingers","coffee","marscapone","rum","vanille","cream"],
      cuisine: "Italian",
      dishType: "dessert",
      image: "https://www.sandravalvassori.com/wp-content/uploads/2022/04/Tiramisu-11484.jpg",
      duration: 240,
      creator: "Ado Campeol"
    }
    return Recipe.create(newRecipe)
  })
  .then((newRecipe) => {
    console.log(newRecipe.created);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
