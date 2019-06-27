const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

/// Connection to the database "recipeApp"

mongoose
.connect("mongodb://localhost/recipeApp3", { useNewUrlParser: true })
.then(() => {
  console.log("Connected to Mongo!");
})
.catch(err => {
  console.error("Error connecting to mongo", err);
});

const recipe1 = {
title: "Taco's Thomas",
level: "Chef",
ingredients: ["tortilla", "carne", "queso", "verdura"],
cuisine: "Mexicano",
dishType: "Fuerte",
duration: 5,
creator: "Francisco"
};

//create a Recipe
let a = Recipe.create(recipe1)
.then(recipe => {
  console.log(recipe.title);
})
.catch(err => {
  console.log(err);
});

//insert many recipes
let b = Recipe.create(data)
.then(recipes => {
  recipes.forEach(recipe =>{
    console.log(`Acabas de insertar las siguientes recetas ${recipes.title} `); //success message  
  })
})
.catch(err => {
  console.log(err);
});
//update recipe 
let c = Recipe.findOneAndUpdate(
{ title: "Rigatoni alla Genovese" }, 
{ duration: 100 },
{ new: true }
)
.then(recipe => {
  console.log(`${recipe} updated!`); //success message
})
.catch(err => {
  console.log(err);
});

let d = Recipe.deleteOne({ title: "Carrot Cake" })
.then(cake => {
  console.log(`${cake} was deleted from the db`); //success message
})
.catch(err => {
  console.log(err);
});

Promise.all([a, b, c, d])
.then(() => {
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
});