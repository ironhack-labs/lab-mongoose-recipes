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
    const recipe = new Recipe({
      title: "Spaghetti",
      level: "Easy Peasy",
      ingredients: [
        "Butter", "Water", "Salt", "Pasta"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 20,
      creator: "Chef Zeynep"
    })

    return Recipe.create(recipe)
  })
  .then(recipe => {
    console.log(`the title of the recipe is ${recipe.title}`)
  })
  //inserting multiple recipes from data.json
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(dataRecipes => {
    dataRecipes.forEach(y => {
      console.log(`the title of the recipe is ${y.title}`)
    })
  })
  //I dont care previous promise value thats why =>()
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    return mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));

// If the connection throws an error
mongoose.connection.on('error', err => console.log(`Mongoose default connection error: ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

