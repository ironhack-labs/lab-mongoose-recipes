const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Iteration 1 | Recipe Schema - done in Recipe.js
//*********************************************** */

// Iteration 2 | Create a recipe
//********************************************** */
// Recipe.create({
//   title: 'My first recipe',
//   level: 'Easy Peasy',
//   ingredients: ['Salt', 'onions', 'oil', 'rice', 'water'],
//   cuisine: 'Ash',
//   dishType: 'Breakfast',
//   duration: 5,
//   creator: 'Ashrafzhon',
// })
//   .then(myRecipe => console.log(`Success: ${myRecipe}`))
//   .catch(err => console.log(err.message));

// Iteration 3 | Insert Many recipes
//******************************************************* */
// Recipe.insertMany(data)
//   .then(recipes => {
//     recipes.forEach(recipe => console.log(recipe.title));
//   })
//   .catch(err => console.log(err.message));

//Iteration 4 | Update recipe
//***************************** *************************/
//1. One way
// Recipe.updateOne(
//   { title: 'Rigatoni alla Genovese' },
//   { $set: { duration: 110 } }
// )
//   .then(recipes => {
//     console.log(recipes);
//   })
//   .catch(err => console.log(err));

//2.way
// Recipe.findOneAndUpdate(
//   { title: 'Rigatoni alla Genovese' },
//   { $set: { duration: 50 } }
// )
//   .then(recipe => {
//     console.log(recipe,'Updated');
//   })
//   .catch(err => console.log(err));

//3.way
// Recipe.findByIdAndUpdate(
//   { _id: '5e2a82aadac7873c48246fe2' },
//   { $set: { duration: 100 } }
// )
//   .then(recipe => {
//     console.log(recipe, 'Updated');
//   })
//   .catch(err => console.log(err));

//4.way - update alternative way
// Recipe.findById('5e2a825b8f64c53b2f028b50')
//   .then(recipe => {
//     recipe.title = 'My updated new recipe';
//     return recipe.save(); // Update the recipe '5e2a825b8f64c53b2f028b50' and return a promise
//   })
//   .then(recipe => console.log('The recipe was updated: ' + recipe))
//   .catch(err => console.log('An error occurred:', err));

// Iteration 5 | Remove a recipe
//********************************************** */
//1.
// Recipe.deleteOne({ title: 'Carrot Cake' })
//   .then(recipes => {
//     console.log(recipes, 'deleted');
//   })
//   .catch(err => console.log(err));

//2.
// Recipe.findOneAndDelete({ _id: '5e2a77fccaaa1215de9385ee' })
//   .then(recipes => {
//     console.log('Successfully deleted');
//   })
//   .catch(err => console.log(err));

//3.
// Recipe.findOneAndRemove({ _id: '5e2a798384476f1b7875787b' })
//   .then(recipes => {
//     console.log('Success');
//   })
//   .catch(err => console.log(err));

//4.
// Recipe.findByIdAndDelete('5e2a7a8b8f32931f50dd3034')
//   .then(recipes => {
//     console.log('success');
//   })
//   .catch(err => console.log(err));

//Iteration 6 | Close the Database
//******************************* *****************/

//My Bonus :)
// Recipe.findByIdAndUpdate('5e2a70d39d02c7fc50db1482', { $inc: { duration: 30 } })
//   .then(recipe => console.log(`${recipe}\n updated`))
//   .catch(err => console.log(err));

// Recipe.countDocuments({})
//   .then(count => console.log(`There are ${count} Recipes`))
//   .catch(err => console.log(err));

//to check
Recipe.find({})
  .then(recipes => {
    console.log(recipes);
  })
  .catch(err => console.log(err));

// Recipe.find({ _id: '5e2a82aadac7873c48246fe2' })
//   .then(recipes => {
//     console.log(recipes);
//   })
//   .catch(err => console.log(err));

// Find all and sort them by title ascending
// Recipe.find({}, null, { sort: { duration: 1 } })
//   .then(recipes => {
//     // handle recipes
//     console.log(recipes);
//   })
//   .catch(error => {
//     // handle error
//     console.log(error);
//   });

// Delete all
// Recipe.deleteMany({})
//   .then(recipes => {
//     // handle recipes
//     console.log(recipes);
//   })
//   .catch(error => {
//     // handle error
//     console.log(error);
//   });
