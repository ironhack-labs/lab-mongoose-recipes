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

    return Recipe.create({
      title: "Pollito",
      level: "UltraPro Chef",
      ingredients: ["garlic", "chicken"],
      cuisine: "American"
    })

  })
  .then(createdRecipe => {

    console.log("Esta receta es ", createdRecipe.title)
    return Recipe.insertMany(data)
  })
  .then(poch => poch.forEach((e) => console.log(e.title)))
  .then(() => { return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }) })
  .then(() => {
    console.log("venga, exito borrando cositas")
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  ;
