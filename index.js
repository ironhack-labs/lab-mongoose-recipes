const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model');
const data = require('./data.js');
const recipe = {
  title: "Poulet caramel aux pistaches",
  level: "Easy Peasy",
  ingredients: ["poulet", "caramel", "pistaches"],
  dishType: "Dish",
  cuisine: "nawak"
}

mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(error => console.error('Error connecting to mongo', error));

const createNewRecipe = Recipe.create(recipe)
  .then(recipe => console.log(`The recipe ${recipe.title} has been saved!`))
  .catch(error => console.error(`Oh no! An error happened while saving a new recipe: ${error}`));

const importRecipes = Recipe.insertMany(data)
  .then (data => console.log(`The recipe ${data.map(recipe => recipe.title)} has been saved!`))
  .catch(error => console.error(`Ouch! An error happened while saving new recipes: ${error}`)); 

const editRecipe = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then (updatedRecipe => console.log(`${updatedRecipe.title} has been updated!`))
  .catch(error => console.error(`Oops! An error happened while updating the recipe: ${error}`))

const deleteRecipe = Recipe.deleteOne({title: 'Carrot Cake'})
  .then (deletedRecipe => console.log(`${deletedRecipe.title} has been deleted!`))
  .catch(error => console.log(`Ooh! An error happened while deleting the recipe: ${error}`))

Promise.all([createNewRecipe, importRecipes, editRecipe, deleteRecipe])
  .then(values => {
    console.log(`Life is magic! All promises were filled: ${values}`);
    mongoose.connection.close();})
  .catch(error => console.error(`Sadness, something went wrong resolving all promises: ${error}`))