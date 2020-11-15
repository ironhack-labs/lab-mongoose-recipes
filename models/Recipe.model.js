const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
  title: { type: String, required: true},
  cuisine: {type: String, required: true},
  ingredients: {type: [String]},
  duration: {type: Number,min: 0},
  creator: {type: String},
  created: {type: Date, default: new Date().toLocaleDateString()},
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image: {
    type: String,
    default:  'https://images.media-allrecipes.com/images/75131.jpg'
  },
  

  

});

//Create the model
const Recipe = mongoose.model('Recipe', recipeSchema);

//Export the model
module.exports = Recipe;







