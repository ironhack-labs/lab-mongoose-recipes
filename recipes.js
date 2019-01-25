const mongoose = require('mongoose');
// we use Schema class given by mongoose
const Schema   = mongoose.Schema;
const data = require('./data.js');

// based on that Schema we create a blueprint for our students collection
const recipeSchema = new Schema ({
  title:{
    type: String,
    required: true
  },
  level: { 
    type: String,
     // values: Easy Peasy - Amateur Chef - UltraPro Chef (ENUM?) 
  },
  ingredients: { type: Array },
  cuisine: { 
    type: String, 
    required: true 
  },
  dishType: {
    type: String, 
    // values: Breakfast - Dish - Snack - Drink - Dessert - Other
  },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg.'},
  duration: { 
    type: Number,
    // minValue: 0 
  },
  creator: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
})


const Recipe = mongoose.model("Recipe", recipeSchema);

// we export the model to make it accessible in other files
module.exports = Recipe;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
