const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

async function main() {
  const filter = {title: "Rigatoni alla Genovese"};
  const update = {duration: 100};
  let recipe = {
    "title": "Denise Delight",
    "level": "Amateur Chef",
    "ingredients": [
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs",
      "1 liter of mustard"
    ],
    "cuisine": "German",
    "dishType": "main_course",
    "duration": 40,
    "creator": "Chef LePapu"
  };
  const db = await mongoose.connect(MONGODB_URI);
  console.log(`Connected to the database: "${db.connection.name}"`);
  try {
    await Recipe.deleteMany();
    await Recipe.create(recipe);
    const recipeArray = await Recipe.insertMany(data);
    recipeArray.forEach(recipe => console.log(recipe.title));
    await Recipe.findOneAndUpdate(filter, update);
    const updatedRecipe = await Recipe.findOne({title: "Rigatoni alla Genovese"});
    console.log("Logging updated Riga: ", updatedRecipe);
    await Recipe.deleteOne({title: "Carrot Cake"});
  } catch (err) {
    console.log(err)
  }
  mongoose.connection.close();
}

main();


// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     let recipe = {
//       "title": "Denise Delight",
//       "level": "Amateur Chef",
//       "ingredients": [
//         "1/3 cup soy sauce (such as Silver Swan®)",
//         "1/4 cup Asian (toasted) sesame oil",
//         "3 tablespoons Asian chili garlic sauce",
//         "3 tablespoons minced garlic",
//         "salt to taste",
//         "8 skinless, boneless chicken thighs",
//         "1 liter of mustard"
//       ],
//       "cuisine": "German",
//       "dishType": "main_course",
//       "duration": 40,
//       "creator": "Chef LePapu"
//     };
//     return Recipe.create(recipe);
//   })
//   // .then(recipe => console.log('The recipe is saved as: ', recipe))
//   .then(() => {
//     return Recipe.insertMany(data);
//   })
//   .then((recipesArray) => {
//     recipesArray.forEach(recipe => console.log(recipe.title));
//   })
//   .then(()=>{
//     const filter = {title: "Rigatoni alla Genovese"};
//     const update = {duration: 100};
//     return Recipe.findOneAndUpdate(filter, update);
//   })
//   .then(()=>{
//     return Recipe.findOne({title: "Rigatoni alla Genovese"});
//   })
//   .then((updatedrecipe) => {
//     console.log("Logging updated Riga: ", updatedrecipe);
//   })
//   .then(() => {
//     return Recipe.deleteOne({title: "Carrot Cake"});
//   })
//   .then(() => {
//     console.log("successfully deleted document.");
//   })
//   .catch(error => {
//     console.error("Something went wrong, logging error: ", error);
//   })
//   .then(() => {
//     mongoose.connection.close();
//   });
