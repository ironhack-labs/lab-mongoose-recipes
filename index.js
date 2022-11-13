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
    // // Iteration 2

  //   return Recipe.create({
  //     "title": "Korean Fried Chicken",
  //     "level": "Amateur Chef",
  //     "ingredients": [
  //       "4 pounds chicken legs, separated into thighs and drumsticks",
  //       "4 quarts peanut or soy oil, for frying",
  //       "1 cup potato starch or tapioca starch",
  //       "1 cup roasted chili oil",
  //       "¼ cup kosher salt",
  //       "1 tablespoon medium/fine gochugaru (ground Korean red pepper)",
  //       "salt to taste",
  //       "8 skinless, boneless chicken thighs"
  //     ],
  //     "cuisine": "Asian",
  //     "dishType": "main_course",
  //     "image": "https://s3.drafthouse.com/images/made/Korean-Fried-Chicken-_-Photo-Credit-Bobby-Fisher_800_1199_81_s.jpg",
  //     "duration": 60,
  //     "creator": "Anthony Bourdain"
  //   })
  // })
// console.log("Korean Fried Chicken");

  // Iteration 3

  .then(() => {
    // Run your code here, after you have insured that the connection was made
  return Recipe.insertMany(data)
      .then(recipe => recipe.forEach(oneRecipe => console.log(oneRecipe.title)))
  })
  .catch(err => console.log(err));


// Iteration 4

 Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true})
  .then(updatedRecipe =>console.log("Success! The recipe duration was updated",
  updatedRecipe))
  .catch(err => console.log(err));


  //Iteration 5

//  Recipe.deleteOne({title: "Carrot Cake"})
//   .then((deletedRecipe) => console.log("Carrot cake deleted"))
//   .catch(err => console.log(err));


  // .catch (error => {
  //   console.error('Error connecting to the database', error);
  // });