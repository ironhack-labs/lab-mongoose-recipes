// Recipe.insertMany(data)
// Connection to the database "recipeApp"
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
//Iteration 2 - Create a recipe
let promise1 = Recipe.create({
  title: 'Im a new Recipe', level: 'UltraPro Chef', ingredients: 'Love and Air', cuisine: 'French', dishType: 'Snack',
})
  .then(recipe => {
    console.log('The new recipe is saved and its value is:', this.title)
    //oder recipe?
  })
  .catch(err => { console.log('An error happened:', err) });

//Iteration 3 - Insert Many recipes
Recipe.insertMany(data)
  .then(recipe => {
    console.log('New Recipe inserted:', this.title)
    //Iteration 4 - Update recipe
    let promise2 = Recipe.updateOne({ name: 'Rigatoni alla Genovese' }, { duration: 100 })
      .then(
        recipe => {
          console.log('The recipe was updated:', recipe)
        }
      )
      .catch(
        err => {
          console.log('An error happened:', err)
        }
      );
    //Iteration 5 - Remove a recipe

    let promise3 = Recipe.deleteOne({
      title: 'Carrot Cake'
    })
      .then(() => console.log("Carrot Cake deleted"))
      .catch(err => console.log(err));

    //Iteration 6 - Close the Database
    Promise.all([promise1, promise2, promise3]).then(() => {
      mongoose.connection.close()
    })
  }).catch(err => { console.log('An error happened:', err) });

// Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// PREVIOUS mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
//   .then(() => {
//     console.log('Connected to Mongo!');
//   }).catch(err => {
//     console.error('Error connecting to mongo', err);
//   });

// Recipe.create({
//   .then(Recipe => console.log(Recipe))
// })
// Candy.create({ type: 'jelly bean' }, { type: 'snickers' }, function (err, jellybean, snickers) {
//   if (err) // ...
// });
  // In index.js, using the Model.create method, you should pass
  // the info to create a new recipe. After the creation, 
  // you can use MongoDB Compass to check everything goes ok. 
  // After inserting the recipe, you should console.log the 
  // title of the recipe.

  // User.create({ name: 'Alice', password:"ironhack2018", job: 'Architect' })
  // .then(user => { console.log('The user is saved and its value is: ', user) })
  // .catch(err => { console.log('An error happened:', err) });