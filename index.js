const mongoose = require('mongoose')
const Recipe = require('./models/Recipe') // Import of the model Recipe from './models/Recipe'
const data = require('./data.js')  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp9', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  })

mongoose.set('useFindAndModify', false);


// Iteration #2
const MexicanRecipe = {
  title: "Tacos",
  level: "UltraPro Chef",
  ingredients: ["tortilla", "carne", "cebolla", "cilantro"],
  cuisine: "Mexicana",
  dishType: "Snack",
  duration: 20,
  creator: "Edgar Herrera"
}

let a = Recipe.create(MexicanRecipe)
  .then(recipe => {
    console.log(recipe.title)
  })
  .catch(err => {
    console.log(err)
  })

  // Iteration #3
let b = Recipe.insertMany(data)
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.title)
    });
  })
  .catch(err => {
    console.log(err)
  })

// Iteration #4
let c = Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  .then(recipe => {
    console.log(`Success!`)
  })
  .catch(err => {
    console.log(err)
  })

// Iteration #5 
let d = Recipe.deleteOne({ title: "Carrot Cake" })
  .then(cake => {
    console.log('Success!')
  })
  .catch(err => {
    console.log(err)
  })

// Iteration #6
Promise.all([a, b, c, d])
  .then(() => {
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })
