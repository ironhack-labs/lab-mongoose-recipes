const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Recipe.deleteMany({})
//   .then(() => {
//     console.log("Success with clearing db")
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// // CREATING MY OWN RECIPE

// Recipe.create({
//   title: "Cheesecake",
//   level: "Amateur Chef",
//   ingredients: ["Cheese", "Cake"],
//   cuisine: "Mystery",
//   dishType: "Dessert",
//   duration: "2400",
//   creator: "The Mike"
// })
//   .then((theCreatedRecipe) => {
//     console.log(theCreatedRecipe.title)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// // ADDING RECIPES FROM DATA.JS

// Recipe.insertMany(data)
//   .then((dataArray) => {
//     dataArray.forEach((recipe) => {
//       console.log(recipe.title)
//     })
//     console.log("Success with creating recipes from data.js")
//   }).catch(err => {
//     console.error(err);
//   });

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//   .then(() => {
//     console.log('Successfully updated')
//   })
//   .catch(err => {
//     console.error(err);
//   });

// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then(() => {
//     console.log('Successfully deleted')
//   })
//   .catch(err => {
//     console.error(err);
//   });