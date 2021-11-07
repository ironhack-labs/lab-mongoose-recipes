const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true, 
    unique: true, // just an index
  },
  level: {
    type: String,
    enum: [ 'Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: {
    type: [String], //Type Array of Strings (represented as [ String ])
  }, 
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other'],
  }, 
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  }, 
  creator: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(), // milliseconds --> Date.now() 'or' --> new Date().getTime()
  }
});

// set Model
// --> first argument: name of the new collection in singular
// because Mongo is going to make it plural for us--> recipes in mongoDB compass
// --> second argument: name of the Schema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
