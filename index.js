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


const newRecipe = { 
  title: 'Shrimp Risotto',
  level: 'Amateur Chef',
  ingredients: ['rice', 'shrimp', 'olive oil', 'white wine', 'onion', 'basil'],
  cuisine: 'italian',
  dishType: 'Dish',
  image: 'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/Hearty-Shrimp-Risotto_exps134312_THHC2238742B09_19_5bC_RMS.jpg',
  duration: 30,
  creator: 'Julia Ramos',
 }

const oneRecipe = Recipe.create(newRecipe)
  // .then(recipe => { console.log('The recipe is saved and its title is: ', recipe.title) })
  // .catch(err => { console.log('An error happened:', err) });

const allRecipes = Recipe.insertMany(data)
  // .then(recipes => { 
  //   console.log('The recipes are saved and its title are:');
  //   recipes.forEach(recipe => console.log(recipe.title));
  // })
  // .catch(err => { console.log('An error happened:', err) });

const update = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    // .then(recipe => { console.log('The recipe has been updated') })
    // .catch(err => { console.log('An error happened:', err) });
  
const deleteCake = Recipe.deleteOne({ title: 'Carrot Cake' })
    // .then(recipe => { console.log('The recipe has been deleted') })
    // .catch(err => { console.log('An error happened:', err) });

  Promise.all([oneRecipe, allRecipes, update, deleteCake])
  .then(response => {
    console.log('The recipe is saved and its title is: ', response[0].title)
    console.log('The recipes are saved and its title are:');
    response[1].forEach(recipe => console.log(recipe.title));
    console.log(response[2]);
    console.log(`The recipe has been updated`);
    console.log(`The recipe has been deleted`);
    mongoose.connection.close();
  })
  .catch(err => { console.log('An error happened:', err) })


  