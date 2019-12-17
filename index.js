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
const editRecipe = (titleRecipe, newDuration) =>{
  Recipe.updateOne({title : titleRecipe} , {duration: newDuration})
  .then(recipe => console.log(`Recipe was update sucessfully`))
  .catch(err => console.log(`Error while updating recipe ${err}`));
}
const deleteRecipe = titleRecipe =>{
  Recipe.deleteOne({title: titleRecipe})
  .then(success => console.log(`Recipe was removed successfully`))
  .catch(err => console.log(`Error while remove recipe ${err}`));
}
let promise1 = addRecipe(data);
let promise2 = editRecipe("Rigatoni alla Genovese", 100);
let promise3 = deleteRecipe("Carrot Cake");
Promise.all([promise1, promise2, promise3])
  .then(sucess =>{
    console.log("Reces succesfully added, deleted and edited")
    mongoose.connection.close();
})
.catch(err => console.error(err));
 // Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

