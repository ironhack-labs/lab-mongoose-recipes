const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
  },

  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },

  ingredients: {
    type: [String]
  },

  cusine: {
    type: String,
  },

  dishType: {
    type: String,
    required: true,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
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
  }

});

const Recipe = mongoose.model('Recipe', recipeSchema);

/*
Recipe.find({})
.then(recipes => {
  console.log(recipes.title)
})
.catch(err => {
  console.log(err)
})

*/
module.exports = Recipe;
