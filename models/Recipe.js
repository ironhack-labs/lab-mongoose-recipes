const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
// title. Type String. It should be required and unique.
  title: {
    type: String,
    required: true,
    unique: true
  },
// level. Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM 😉)
  level: {
    level: { 
      type: String, 
      enum : ['Easy Peasy','Amateur Chef', 'UltraPro Chef'],       
      },     
  },
// ingredients. Type Array.
  ingredients: {
    type: Array
  },
// cuisine. Type String. Should be required.
  cuisine: {
    type: String,
    required: true
  },
// dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
  dishType: {
    type: String,
    enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']
  },
// image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
// duration. Type Number. Min value should be 0.
  duration: {
    type: Number,
    min: 0
  },
// creator. Type String
  creator: {
    type: String
  },
// created. Type Date. By default today.
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
