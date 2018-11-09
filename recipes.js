const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

//ITERATION 1 - Recipe Schema
const recipeSchema = new Schema({
  title: { type: String },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: { type: Array },
  cuisine: {type :String,  require: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: { type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now},
});

//ITERATION 2 - Create a recipe
const Recipe = mongoose.model("Recipe", recipeSchema);
// module.exports = Recipe;

Recipe.create(
  {
    title: 'Asian Glazed Chicken Thighs',
    level: 'Amateur Chef',
    ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
    cuisine: 'Asian',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 40,
    creator: 'Chef LePapu'
  }
);


//ITERATION 3 - Insert many recipes
Recipe.insertMany(data)
.then(success => {
  success.forEach(oneRecipe => {
  console.log(oneRecipe.title)
  });
})
.catch(error => {
  console.log(error);
})

//ITERATION 4
// Recipe.updateOne({ name: 'Rigatoni alla Genovese'}, { duration: 100 })
//   .then(success => {
//     console.log("update success", success);
//   })
//   .catch(error => {
//     console.log(error);
//   });
Recipe.findByIdAndUpdate("5be5729f8dfa473cb7c37a4e", { $set: {duration: 100} })
  .then(success => {
    console.log("update success", success);
  })
  .catch(error => {
    console.log(error);
  });

  //ITERATION 5
  Recipe.findByIdAndRemove("5be5729f8dfa473cb7c37a4d")
  .then(success => {
    console.log("remove success", success);
  })
  .catch(error => {
    console.log(error);
  });

  