const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema ({
    title: {
      type: String,
      required: true,
      unique: true
    },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef" ]
    },
    ingredients: {
      type: Array,
    },
    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ["Breakfast","Dish","Snack","Drink","Dessert","Other"]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg"
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: {
      type: String
    },
    created: { 
      type: Date,
      default: Date.now
    },
  }, {
    timestamps: true
  })
const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

Recipe.create ({
  title: 'Colombian Burgers',
  level: "Amateur Chef",
  ingredients: ["Ground Sirloin","Soy Sauce","Pineapple Jam","Quali Eggs", "Cilantro", "Mozarella", "HAM", "Salsa Rosada"],
  cuisine: "Colombian",
  dishType: "Dish",
  image: "https://www.mycolombianrecipes.com/wp-content/uploads/2009/07/Hamburguesa-066.jpg",
  duration: 50,
  creator: "Nicolas",
})
  .then(recipe => { console.log('The recipe has been saved and is: ', recipe.title) })
  .catch(err => { console.log('An error happened:', err) });

  Recipe.insertMany(data)
  .then(recipe => { console.log('The recipes have been saved!') })
  .catch(err => { console.log('An error happened:', err) });

Recipe.findByIdAndUpdate("5c4bce9dd632c12e9fa41bbf", { duration: 100})
.then(updateRecipe => {
  console.log("Success updating Rigatoni")
})
.catch( err => {
  console.log("DB not updated", err)
})
Recipe.findByIdAndDelete("5c4bce9dd632c12e9fa41bbe")
  .then( recipe => {
    console.log("Success deleting carrot cake")
  })
  .catch( err => {
    console.log("DB not updated", err)
  })