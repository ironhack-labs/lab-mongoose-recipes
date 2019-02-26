const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipe')

app.use(bodyParser.urlencoded({ extended: false }))
// // Iteration 6 - Close the Database
// mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
//   .then(() => console.log('Connected to Mongo!'))
//   .catch(err => console.error('Error connecting to mongo', err));

// //Iteration 2 - Create a recipe  
// Recipe.create({
//   title: 'Asian Glazed Chicken Thighs',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//   cuisine: 'Asian',
//   dishType: 'Dish',
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 40,
//   creator: 'Chef LePapu'
// }, (err, result) => {
//     err ? console.log(err) : console.log(result);
// });


// // Iteration 3 - Insert Many recipes
// Recipe.insertMany( data , (err, result)=> {
//   err ? console.log(err) : console.log(result); 
// })

// // Iteration 4 - Update recipe
// Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100 }, (err, result) => {
//   err ? console.log(err) : console.log(`sucessfully updated ${result} `)
// })

// // Iteration 5 - Remove a recipe
// Recipe.deleteOne({ title: 'Carrot Cake' }, err => err ? console.log(err) : console.log(`recipe removed`));

// Iteration 6 - Close the Database
mongoose.disconnect('mongodb://localhost/recipeApp')
  .then(() => console.log('Disconnected from Mongo!'))
  .catch(err => console.error('Error disconnecting from mongo', err));

app.listen(3000, () => console.log('ik luister naar recepten'));
