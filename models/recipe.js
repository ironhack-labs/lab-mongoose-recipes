const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true
  },

  level: {
    type: String,
    enum: [
      'Easy Peasy',
      'Amateur Chef',
      'UltraPro Chef'
    ]
  },

  ingredients: {
    type: []
  },

  cuisine: {
    type: String,
    require: true
  },

  dishType: {
    type: String,
    enum: [
      'Breakfast',
      'Dish',
      'Snack',
      'Drink',
      'Dessert',
      'Other'
    ]
  },

  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },

  duration: {
    type: Number,
    default: 0
  },

  creator: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  }

});

const Recipe    = mongoose.model('Recipe', recipeSchema);
module.exports  = Recipe;

// {
//   title: 'Asian Glazed Chicken Thighs',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//   cuisine: 'Asian',
//   dishType: ['Dish'],
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 40,
//   creator: 'Chef LePapu'
// },


// title. Type String. It should be required and unique.
// level. Type String. Only can be one of the following values: Easy Peasy - Amateur Chef - UltraPro Chef (remember the ENUM wink)
// ingredients. Type Array.
// cuisine. Type String. Should be required.
// dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
// image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
// duration. Type Number. Min value should be 0.
// creator. Type String
// created. Type Date. By default today.