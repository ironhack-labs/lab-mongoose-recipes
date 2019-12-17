const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
//Insert one element
/* 
Recipe.create({
  title: "Cherios with milk",
  level: "Easy Peasy",
  ingredients: ["milk" , "cherios"],
  cuisine: "Mix milk with cherios",
  dishType: "Breakfast",
  duration: 10,
  creator: "Analin Flores"

})
.then (recipe =>{ console.log(`New recipe created ${recipe.title}`)})
.catch(err => {console.log(`An error happend ${err}`)})*/
//Insert Many
const addNewRecipe = (title,level, ingredients,cuisine,dishType,duration,creator) =>{
  const recipe = new Recipe({
    title: title,
  level: level,
  ingredients: ingredients,
  cuisine: cuisine,
  dishType: dishType,
  duration: duration,
  creator: creator
  });
  recipe
    .save()
    .then(newRecipe =>{ console.log(`New recipe was created ${newRecipe.title}`)})
    .catch(err => console.log(`Error while creating a new recipe ${err}`))
}
const addRecipe = data =>{
  data.forEach(recipe =>{
    addNewRecipe(recipe.title, recipe.level, recipe.ingredients , recipe.cuisine , recipe.dishType, recipe.duration, recipe.creator);
  
  })
}

addRecipe(data);
 // Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

