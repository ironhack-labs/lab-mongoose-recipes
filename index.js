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

/* -------->>>> Utilizando o metodo create  <<<<<--------- */

// Recipe.create({
//   title: 'Strogonoff',
//   level: 'Easy Peasy',
//   ingredients: ['Rice', 'Meat', 'Milk Cream', 'Ketchup', 'Mustard'],
//   cuisine: 'Cozinha 1',
//   dishType: 'Dish',
//   duration: 30,
//   creator: 'Joel',
// })
//   .then(recipe => { console.log('The Recipe is saved and its value is: ', recipe.title) })
//   .catch(err => { console.log('An error happened:', err) });


/* -------->>>> Utilizando o metodo InsertMany  <<<<<--------- */
// Recipe.insertMany(data)
//   .then((recipes) => {
//     // catsFromDB is an array of Cat instances
//     recipes.forEach(oneRecipe => console.log(` --> recipe: ${oneRecipe.title}`));
//   })
//   .catch((err) => {
//     console.log('Insert Many - An error happened:', err);
//   });

/* -------->>>> Utilizando o metodo find  <<<<<--------- */
// Recipe.updateMany({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/* -------->>>> Utilizando o metodo delete  <<<<<--------- */
// Recipe.deleteOne({ title: 'Carrot Cake'})
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/* -------->>>> Utilizando o metodo find  <<<<<--------- */
Recipe
  .find()
  .then(recipeFromDB => {
      // catsFromDB is an array of Cat instances
      recipeFromDB.forEach(oneRecipe => console.log(` --> recipe: ${oneRecipe.title} + --> duration: ${oneRecipe.duration}`));
      mongoose.disconnect();
  })
  .catch(err => console.log(`Error occurred during getting recipes from DB: ${err}`));
  
