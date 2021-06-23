const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

  title : {
    type: String,
    required: true,
    unique: true,
  },
  level : {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients : {
    type: [String]
  },
  cuisine : {
    type: String,
    required: true
  },
  dishType : {
    type: String,
    Enumerator: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  image : {
    type: String,
    Default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration : {
    type: Number,
    min: 0,
  },
  creator : {
    type: String
  },
  created : {
    type: Date,
    default: 23/06/2021,
  }
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
