const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

new Promise(function(resolve, reject) {

  // Create a Recipe
  const newRecipe = new Recipe({
    title : 'Pizza',
    level : 'Easy Peasy',
    cuisine : 'Italian',
    dishType : 'Dish',
    duration : 30,
    creator : 'Alex'
  });

  // Insert the recipe into the DB
  newRecipe.save()
  .then((recipe) => {
    console.log("We inserted the following recipe into the DB : ", recipe.title);
    resolve(recipe);
  }).catch((error) => { reject(error) })

}).then(function(result) {

  // Populate the DB with the data
  return new Promise((resolve, reject) => {
    Recipe.insertMany(data)
    .then((records) => {
      console.log("Inserted data into DB !");
      resolve(records)
    }).catch((error) => { reject(error) })
  });

}).then(function(result) {

  // Update a specific recipe
  return new Promise((resolve, reject) => {
    Recipe.update({title : 'Rigatoni alla Genovese'}, { $set: { duration : 100 }})
    .then((recipe) => {
      console.log("Bravo ! Recipe updated successfully !")
      resolve(recipe)
    }).catch((error) => { reject(error) })
  });

}).then(function(result) {

  // Delete a specific recipe
  return new Promise((resolve, reject) => {
    Recipe.findOneAndRemove({title : 'Carrot Cake'})
    .then((recipe) => {
      console.log("We deleted 'Carrot Cake' from DB !");
      resolve(recipe)
    }).catch((error) => { reject(error) })
  });

}).catch((error) => {
  console.log("GLOBAL ERROR : ", error);
}).finally(() => {
  mongoose.disconnect() // After all is done, disconnect from DB
})
