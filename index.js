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

// Iteration 2: Create a recipe
// Recipe.create({ title: "Chicken with Lemon", cuisine: "Asian Fusion"})
//       .then(data => console.log(`Recipe successfully created.`, data.title))
//       .catch(err => console.log(`Recipe could not be created`, err));

// Iteration 3: Insert Many recipes
// Recipe.insertMany(data)
//       .then(data => {
//         const importedData = data.map(recipe => recipe.title);
//         console.log(`Imported Recipes:`, importedData);
//       })
//       .catch(err => console.log("Recipes could not be imported", err));

// Iteration 4: Update recipe
// Recipe.findOne({ title: "Rigatoni alla Genovese"}) // findOne can be omitted when using updateOne but for readability it's here
//       .updateOne({duration: 100})
//       .then(data => console.log(`Recipe successfully updated:`, data))
//       .catch(err => console.log("Recipe could not be updated", err));

// Iteration 5 - Remove a recipe
// Recipe.deleteOne({ title: "Carrot Cake"})
//       .then(data => console.log(`Recipe successfully removed.`, data))
//       .catch(err => console.log("Recipe could not be removed", err));

// Iteration 6 - Close the Database
// mongoose.connection.close(() => {
//   console.log('Mongoose connection disconnected');
// });