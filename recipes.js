const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema ({
    title: {
      type: String,
      unique:true,
      required: true
    },
    level: {
      type: String,
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
    },
    ingredients: {
      type: Array,
    },
    cuisine: {
      type: String,
      required: true,
    },
    dishType: {
      type: String,
      enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
    },
    image:{
      type: String,
      default: 'https://images.media-allrecipes.com/images/75131.jpg'
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
  })

  const Recipe = mongoose.model('Recipe', recipeSchema)

  // Recipe.create({
  //   title: 'Asiann Glazed Chicken Thighs',
  //   level: 'Amateur Chef',
  //   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  //   cuisine: 'Asian',
  //   dishType: ['Dish'],
  //   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  //   duration: 40,
  //   creator: 'Chef LePapu'
  // })
  // .then((result) => {console.log(result)})
  // .catch(error => {
  //   console.log('error', error)
  // })

  const manyRecipes = [
    {
      title: 'Apple and Milk-Braised Pork Carnitas',
      level: 'UltraPro Chef',
      ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
      cuisine: 'American',
      dishType: ['Dish'],
      image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
      duration: 160,
      creator: 'Chef John'
    },

    {
      title: 'Banana and Milk-Braised Pork Carnitas',
      level: 'UltraPro Chef',
      ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
      cuisine: 'American',
      dishType: ['Dish'],
      image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
      duration: 160,
      creator: 'Chef John'
    }
  ]

  Recipe.insertMany(manyRecipes)

  .then((result) => {console.log(result)})
  .catch(error => {
    console.log('error', error)
  })

  
