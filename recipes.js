const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js')
const Recipe = require("./models/Recipe");



mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')

  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

 Recipe.create( { 
  title: 'Jamones al Vapor',
  level: 'Amateur Chef',
  ingredients: ['1/2 jamones', '5 cacas', '1/3 agua bendita', '1/4 juanolas', '3 ojos de pez'],
  cousine: 'Española',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 80,
  creator: 'Chef Antilia'
}, function (err, recipe) {
  if (err) console.log('An error happened:', err);
  else{
    console.log('The title is: ', recipe.title);

  } 
});

Recipe.insertMany(data, function (err, recipe) {
  if (err) console.log('An error happened:', err);
  else console.log('Se han guardado: ' + recipe.length);
    //para evitar la sincronia poner aqui el siguiente proceso.
});
Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then((successCallback) => {
    console.log("Cojonudo")
  }).catch((errorCallback) =>{
    console.log ("La has cagado")
  });
  
  Recipe.remove({ title: "Carrot Cake", level: 'Amateur Chef',
  ingredients: ['6 cups grated carrots', '1 cup brown sugar', '1 cup raisins', '4 eggs', '1 1/2 cups white sugar', '1 cup vegetable oil', '2 teaspoons vanilla extract', '1 cup crushed pineapple, drained', '3 cups all-purpose flour', '1 1/2 teaspoons baking soda', '1 teaspoon salt', '4 teaspoons ground cinnamon'],
  cousine: 'International',
  dishType: ['Dessert'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: 130,
  creator: 'Chef Nadia' })
  .then((successCallback) => {
    console.log("Hiugueputa")
  }).catch((errorCallback) =>{
    console.log ("La has cagado")
  });
  mongoose.connection.close()