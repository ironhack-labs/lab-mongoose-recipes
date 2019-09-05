const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipesCRUD", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err)
  })

const recipe1 = {
  title: "Mimosa",
  level: "Amateur Chef",
  ingredients: ["Orange juice", "Asti", "ice"],
  cuisine: "French",
  dishType: "Drink",
  duration: 5,
  creator: "Lara"
}
let recipeCreated = Recipe.create(recipe1)
  .then(recipe => {
    console.log(recipe)
  })
  .catch(err => {
    console.log(err)
  })

let recipesCreated = Recipe.create(data)
  .then(recipes => {
    console.log(`Update ${recipes.length} `)
  })
  .catch(err => {
    console.log(err)
  })
let recipedUpdated = Recipe.findOneAndUpdate({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }, {
    new: true
  })
  .then(recipe => {
    console.log(recipe)
  })
  .catch(err => {
    console.log(err)
  })

let recipeDeleted = Recipe.deleteOne({
    title: "Carrot Cake"
  })
  .then(cake => {
    console.log(`${cake} Not available anymore`)
  })
  .catch(err => {
    console.log(err)
    
  })
