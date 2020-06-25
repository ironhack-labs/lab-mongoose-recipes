const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    validate: {
      message: 'Every Word needs to be with capital letter',
      enum: ['Easy Peasy', 'Amateur Chef ', 'UltraPro Chef']
    }
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
    // Possible values
    
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.prototype.toTimeString()
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
