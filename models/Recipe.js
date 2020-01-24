// Iteration 1 - Recipe Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//this is my Bonus
function upperCase(val) {
  if (typeof val !== 'string') val = '';
  return val.toUpperCase();
}

// const userSchema = new Schema({
//   name: {
//     type: String,
//     set: upperCase, // <= here we call the setter we defined earlier
//   },
// });

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true,
    set: upperCase, // <= here we call the setter we defined earlier
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
  },
  ingredients: Array,
  cuisine: {
    type: String,
    required: true,
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg',
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

// Example of custom validation

// const userSchema = new Schema({
//   linkedinProfile: {
//     type: String,
//     validate: {
//       validator: (text) => {
//         return text.indexOf('https://www.linkedin.com/') === 0;
//       },
//       message: "linkedinProfile must start with 'https://www.linkedin.com/'"
//     }
//   }
// };
