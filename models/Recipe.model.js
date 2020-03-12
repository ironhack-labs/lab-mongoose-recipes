//SERVER CONNECTION
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//why do we need a placeholder here?
.then((connectionInfo) => {
  console.log("Connected!")
})

.catch((error) => {
  console.log("Error!", error)
});

//MODEL DEFINITION
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String, 
    required: true, 
    unique: true
  },

  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },

  ingredients: {
    type: Array
  },

  cuisine: {
    type: String, 
    required: true
  },

  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
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
    default: Date.now
  }
});

//MODEL EXPORT
const recipe = mongoose.model('recipe', recipeSchema);
module.exports = recipe;
