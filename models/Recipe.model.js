const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  
    title:{
      type: String,
      required: true,
      default: 'Nombre desconocido',
      trim: true,
      unique: true,
      set: value => value.charAt(0).toUpperCase() + value.substring(1)
    },
    level: {
      type: String,
      enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']
    },
    ingredients: 
    [String],

    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
     enum: ['breakfast', 'dinner', 'soup','snack', 'drink', 'dessert','main_course']
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
      type: String,
    },
   

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
