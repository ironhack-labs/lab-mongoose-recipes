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

  // Create a recipe
Recipe.create({ 
  title: "Fabada", 
  level: "Amateur Chef", 
  ingredients: ["Fabes", "Chorizo", "Morcilla", "Tocino"],
  cuisine: "Asturiana",
  dishType: "Dish",
  duration: 45,
  creator: "Abuelas asturianas",
  created: "1800-01-01"
})
  .then(recipe => console.log("${this.title}"))
  .catch(err => console.log("Something went wrong"));

  // Insert many recipes
  const insertRecipes = Recipe.insertMany(data);

  // Update recipe
  const updateRecipe = Recipe.updateOne({ title: 'Rigatoni alla Genovese', duration: 100 })
    .then(updatedRecipe => console.log('Recipe successfully updated'))
    .catch(err => console.log('Something went wrong'));

  // Remove a recipe
  const removeRecipe = Recipe.deleteOne({ title: "Carrot Cake" })
    .then(removedRecipe => console.log('Recipe successfully removed'))
    .catch(err => console.log('Something went wrong'));

  // Close the database
  const closeDatabase = mongoose.connection.close()
    .then(closedDatabase => console.log('Database successfully closed'))
    .catch(err => console.log('Something went wrong'));

  // Viva la asincronía, pendejo!!
  Promise.all([updateRecipe, removeRecipe, closeDatabase])
    .then(promises => console.log('Actions successfully executed'))
    .catch(err => console.log('Something went wrong'));
