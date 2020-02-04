const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title : {
    type: String,
    unique: true,
    required:true
  },

  // Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉) :
  level : {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients : {
    type: Array,
  },

  // Should be required:
  cuisine : {
    type: String,
    required: true 
  },
  // Breakfast - Dish - Snack - Drink - Dessert - Other :
  dishType : {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  // Default value: https://images.media-allrecipes.com/images/75131.jpg :
  image : {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },  

  duration : {
    type: Number,
    min: [0] 
  },

  creator : {
    type: String,
  },
  // By default today.
  created : {
    type: Date,
    default: Date.now
  }

});



const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
