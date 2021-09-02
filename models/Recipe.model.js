const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    unique: true,
    type: String,
    required: true,
    trim: true,
    set: value => value.charAt(0).toUpperCase() + value.substring(1).toLowerCase()
},
  level: {
  type: String,
  enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
},
  ingredients: {
    type: [String]
},
  cuisine: {
    type: String,
    required: true
},
  dyshType: {
    type: String,
    enum: ['breakfast', 'main-course', 'soup', 'snack','drink','dessert','other']
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg",   

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

module.exports = Recipe;
