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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({
        title: "foundee",
        level: "Easy Peasy",
        ingredients: ["cheese", "liquor"],
        cuisine: "french",
        dishType: "soup",
        duration: 10,
        creator: "Alejandro",
      })

      .then(() => {
        return Recipe.insertMany(data)
      })

      .then(() => {
        return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      })
      .then(() => {
        return Recipe.deleteOne({ title: "Carrot Cake" })
      })
    // .then(recipes => console.log("recetas", recipes))
    // .then(newRecipe => console.log("la nueva receta es", newRecipe))
    //.catch(error => console.log('Hubo un error:', error))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination')
})

