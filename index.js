const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {

    const newRecipe = {
      title: "Vegan Thai Curry",
      level: "Easy Peasy",
      ingredients: "Vegan stuff",
      cuisine: "Vegan Thai",
    }
    return Recipe.create(newRecipe)
    // Run your code here, after you have insured that the connection was made
  })
  .then((newRecipe) => {
    console.log(newRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((dataDb) => {
    dataDb.forEach((element) => {
      console.log(element.title)
    })
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    }) 
  .then(() => {
    console.log("You have updated the duration of Rigatoni")
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("You have run out of Carrot Cake")
    mongoose.connection.close()
  })
  .then(() => {
    console.log("database is closed")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

