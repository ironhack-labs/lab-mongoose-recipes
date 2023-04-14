const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe.create({ title: "New Recipe" , cuisine: "italian"})
    .then(createdRecipe => console.log(createdRecipe))
    .catch(err => console.log(err))

    Recipe.insertMany(data)
      .then(createdRecipe => console.log(createdRecipe))
      .catch(err => console.log(err))

    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 220})
    .then(createdRecipe => console.log(createdRecipe))
    .catch(err => console.log(err))

    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100}, { new: true })
    .then(newRecipe => console.log(newRecipe))
    .catch(err => console.log(err))

    Recipe.findOneAndDelete({ title: "Carrot Cake" })
    .then(deletedRecipe => console.log(deletedRecipe))
    .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
		// Close connection
		mongoose.connection.close()
  })
