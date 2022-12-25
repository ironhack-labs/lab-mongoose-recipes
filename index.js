const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })

  // Iteration 2
  .then(() => Recipe.create({
      title: "Vegan Pancakes",
      level: "Easy Peasy",
      ingredients: ["Chickpea flour", "Oat milk", "Sugar", "Maple syrup"],
      cuisine: "Vegan",
      dishType: "breakfast",
      image: "https://biancazapatka.com/de/die-besten-veganen-pancakes/",
      duration: 20,
      creator: "Nadine",

}))

  .then((recipe) => console.log(recipe.title))

// Iteration 3
  .then(() => Recipe.insertMany(data))
  .then((recipes) => {
    for (recipe of recipes) console.log(recipe.title)
  })

  // Iteration 4
.then(() => Recipe.findOneAndUpdate(
  {title: "Rigatoni alla Genovese"},
  {duration: 100}
))
.then(() => console.log("Updated Rigatoni recipe succussfully"))

// Iteration 5
.then(() => Recipe.deleteOne({title: "Carrot Cake"}))
.then(() => console.log("Removed Carrot Cake recipe succussfully"))

// Iteration 6
.then(() => mongoose.disconnect())
                           
.catch((error) => {
    console.error('Error connecting to the database', error);
  }); 
   
