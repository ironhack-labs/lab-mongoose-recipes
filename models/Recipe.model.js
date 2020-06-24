const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
    title: {
      type: String,
      unique: true,
      //required: true,
    },
    
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },

    ingredients: {
      type: [String],
    },

    dishType: {
      type: String,
      enum: ['breakfast', 'main_course' 'soup', 'snack', 'drink', 'dessert', 'other']
    },

    image: {
      type: String,
      default: ""
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
      default: Date.now,
    }

  });

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
