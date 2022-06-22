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
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// ITERATION #2


// Recipe
//   .create({
//     title: "Asian Glazed Chicken Thighs",
//     level: "Amateur Chef",
//     ingredients: [
//       "1/2 cup rice vinegar",
//       "5 tablespoons honey",
//       "1/3 cup soy sauce (such as Silver Swan®)",
//       "1/4 cup Asian (toasted) sesame oil",
//       "3 tablespoons Asian chili garlic sauce",
//       "3 tablespoons minced garlic",
//       "salt to taste",
//       "8 skinless, boneless chicken thighs"
//     ],
//     cuisine: "Asian",
//     dishType: "main_course",
//     image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//     duration: 40,
//     creator: "Chef LePapu"
//   })
//   .then(newRecipe => console.log("El título es", newRecipe.title))
//   .catch(err => console.log('ERROR DE MONGOOSE', err))


// ITERATION #3


// Recipe
//   .create(data)
//   .then(recipeArr => console.log(recipeArr))
//   .catch(err => console.log('ERROR DE MONGOOSE', err))


// ITERATION #4 & #6


// Recipe
//   .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 101 })
//   .then(recipeUpd => {
//     console.log(recipeUpd)
//     mongoose.connection.close(() =>
//     console.log('DISCONNECTED FROM MONGOOSE'))
//   })
//   .catch(err => console.log('ERROR DE MONGOOSE', err))


// ITERATION #5


// Recipe
//   .deleteOne({ title: 'Carrot Cake' })
//   .then(recipeDeleted => console.log('Éxito!', recipeDeleted))
  
//   .catch(err => console.log('ERROR DE MONGOOSE', err))


// ITERATION #6
