const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: 'string',
    required: true,
    unique: true
  }, 
  level:{
    type: 'string',
    enum: ['Easy Peasy','Amateur Chef','UltraPro Chef']
  },
  ingredients:
    [String],
  cuisine:{
    type: 'string',
    required: true
  },
  dishType:{
    type: 'string',
    enum: ['breakfast','main_course','soup','snack','drink','dessert','other']
  },
  image:{
    type: 'string',
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration:{
    type: Number,
    min: 6
  },
  creator: String,
  created:{
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);


 






module.exports = Recipe;
