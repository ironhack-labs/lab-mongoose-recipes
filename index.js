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

// Connection monitoring
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));
mongoose.connection.on('error', (err) =>  console.log(`Mongoose default connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));



//Iteration 2 - Create a recipe
const createRecipe = Recipe.create({
    title: "Bigos",
    level: 'Easy Peasy',
    ingredients: ['smoked bacon', 'onions', 'Polish Sausage', 'beef stew meat', 'mushrooms', 'carrots', 'sauerkraut', 'cabbage', 'herbs'],
    cuisine: 'Polish',
    dishType: 'Dish',
    image: 'https://cdn.pixabay.com/photo/2014/09/14/14/19/bigos-445017_1280.jpg',
    duration: 120,
    creator: 'Tomasz & Karin'    
  })
  .then(recipe => { console.log('Recipe is saved and its title is: ', recipe.title) })
  .catch(err => { console.log('An error at creating recipe happened:', err) });

//Iteration 3 - Insert Many recipes
const createManyRecipes = Recipe.insertMany(data)
  .then(data => {
      console.log('Recipes are saved and its titles are: ');
      data.forEach(elem => {
        console.log(elem.title)
      });
    })
  .catch(err => { console.log('An error at inserting recipes happened:', err) });

//Iteration 4 - Update recipe
/* const RecipeUpdate = Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(() => { console.log('Duration of "Rigatoni alla Genovese" was updated successfully'); })
  .catch(err => { console.log('An error happened:', err); }); */


//Iteration 5 - Remove a recipe
/* const deleteRecipe = Recipe.deleteOne({title: "Carrot Cake"})
  .then((result) => { console.log('Recipe deleted status', result); })
  .catch(err => { console.log('An error happened:', err); })
  //.finally(() => { mongoose.connection.close() }); // Not working here (asynchronous process) */

//Iteration 4 - Update recipe &  Iteration 5 - Remove a recipe
let updateRecipeDB = createManyRecipes
  .then(() => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
      .then(() => { console.log('Duration of "Rigatoni alla Genovese" was updated successfully') })
      .catch(err => { console.log('An error happened:', err) });
  })
  .then(() => {
    Recipe.deleteOne({title: "Carrot Cake"})
      .then((result) => { console.log('Recipe deleted status', result) })
      .catch(err => { console.log('An error happened:', err) });
  })
  .catch(err => { console.log('An error happened:', err) });

  // Iteration 6 - Close the Database
Promise.all([createRecipe, createManyRecipes, updateRecipeDB])
  .then(() => {      
    mongoose.connection.close();
  })
  .catch(err => console.error(err));