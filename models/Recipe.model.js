const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
      type: String,
      required: true //validations: we have to have a name otherwise we will have an error
    },
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] //validations: the color has to be one of these otherwise we will have an error
    },
    ingredients: {
      type: [String]
    },
    cuisine: {
      type: String,
      required: true
    },
    dishType: {
      type: String,
      enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
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
      type: String
    },
    created: {
      type: Date,
      default: Date.now()
    }

  
  // TODO: write the schema
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;




