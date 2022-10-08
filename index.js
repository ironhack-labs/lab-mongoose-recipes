const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const myRecipe = {
  title: "Cheese Salad",
    level: "Amateur Chef",
    ingredients: [
      "1 hamburger",
      "2 slices of cheese",
      "2 slices of tomato",
      "two lettuce leaves",
    ],
    cuisine: "American",
    dishType: "main_course",
    image: "https://sachefmio.blob.core.windows.net/fotos/cheese-salad-93590.jpg",
    duration: 10,
    creator: "Chef Barbabram"
}

const MONGODB_URI = 'mongodb+srv://abramwhas:555200@cluster0.uooc2pi.mongodb.net/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create(myRecipe)
    console.log(myRecipe.title)
  })
  .then(() => {
    Recipe.insertMany(data)
    for(let i = 0; i < data.length; i++) {
      console.log(data[i].title)
    }
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
