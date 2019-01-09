const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Receipe = require("./models/recipe")

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



Receipe.create({
  title: 'Carrot Cake',
  level: 'Amateur Chef',
  ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
  cuisine: 'International',
  dishType: ['Dessert'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: 130,
  creator: 'Chef Nadia'
})
.then(receipe => {console.log("The title is: ", receipe.title)})
.catch(err => {console.log("An error happened", err)})


Receipe.insertMany(data)
.then(recipe => console.log("Recipe created: ", recipe.title))