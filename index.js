const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

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
    let newRecipe = {title: 'Chilaquiles verdes', cuisine: 'Mexican'};
    Recipe.create(newRecipe)
	  console.log(newRecipe.title)
    return Recipe.insertMany(data)
  })
	.then((allRecipes) => {
    allRecipes.forEach(createdRecipe => console.log(createdRecipe.title))
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, {new: true})
  })
  .then((updatedRecipe) => {
    console.log("successfully updated:", updatedRecipe.title)
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => {
    console.log("successfully deleted recipe")
    return mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

