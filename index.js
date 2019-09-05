const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    let p2 = iterationTwo();
    let p3 = Promise.all([p2]).then(() => iterationThree());
    let p4 = Promise.all([p2, p3]).then(() => iterationFour());
    let p5 = Promise.all([p2, p3, p4]).then(() => iterationFive());
    Promise.all([p2, p3, p4, p5]).then(() => iterationSix());
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
    
// Iteration two: create and verify a new recipe
function iterationTwo() {
  let promise = Recipe.create({
    title: "Iteration Two Stroganoff",
    level: "Amateur Chef",
    ingredients: ["cream", "mushrooms", "beef"],
    cuisine: "Brazilian",
    dishType: "Dish",
    image: "http://s2.grouprecipes.com/images/recipes/original/409271794.jpg",
    duration: 20,
    creator: "Dr. Food",
    created: Date.now()
  })
    .then((item) => {
      console.log(`Recipe successfully added: ${item.title}`);
    })
    .catch((err) => {
      console.log(`Recipe was not added to database: ${err}`);
    })
  return promise;
}

// Iteration three: add and verify multiple recipes at once
function iterationThree() {
  let promise = Recipe.insertMany(data)
    .then((array) => {
      console.log("Many recipes added: ")
      for (let recipe of array) {
        console.log(recipe.title);
      }
    })
    .catch((err) => {
      console.log(`There was an error in Iteration Three: ${err}`);
    })
  return promise;
}

// Iteration four: update and verify an existing recipe
function iterationFour() {
  let promise = Recipe.findOne({ title: "Rigatoni alla Genovese" })
    .then((recipe) => {
      console.log(`Recipe retrieved!`);
      recipe.duration = 100;
      recipe.save()
        .then(() => {
          console.log(`Updated recipe saved`)
        })
        .catch((err) => {
          console.log(`There was a problem updating the recipe: ${err}`)
        })
    })
    .catch((err) => {
      console.log(`There was an error fetching the recipe: ${err}`)
    })
  return promise;
}

// Iteration five: remove a carrot cake recipe
function iterationFive() {
  let promise = Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => {
      console.log(`Recipe deleted.`)
    })
    .catch((err) => {
      console.log(`There was an error deleting the recipe: ${err}`)
    })
  return promise;
}

// Iteration six: close the connection
function iterationSix() {
  mongoose.connection.close()
    .then(() => {
      console.log(`Connection closed.`);
    })
    .catch((err) => {
      console.log(`There was an error closing the connection: ${err}`)
    })
}