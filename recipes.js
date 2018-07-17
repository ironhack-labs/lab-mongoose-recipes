const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  const recipesSchema = new Schema 
(
  {
    title: String,
    level: {
      type : String,
      enum : ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: Array,
    cousine: {
      type: String,
      required: true
    },
    dishType: {
      type: String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg."
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: String,
    created:{
      type: Date,
      default: Date.now
    }
  }  
)

const newRecipe = mongoose.model("recipes", recipesSchema);
newRecipe.create({ name: 'new recipe', cousine: 'mediterranea' })
  .then((newRecipe) => { console.log('The recipe is saved and its value is: ', newRecipe) })
  .catch((err) => { console.log('An error happened:', err) });

