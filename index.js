const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model');

const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose
  .connect(MONGODB_URI)
  .then((mongooseConnect) => {
    console.log(`Connected to the database: "${mongooseConnect.connection.name}"`);

    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(data[0])
  })
  .then((recipe) => {
    console.log(recipe.title)
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((recipes) => {
    recipes.map(recipe => {
      console.log(recipe.title)
    })
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  })
  .then(() => {
    console.log("funcionó")
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then(() => {
    console.log("Borrado")
  })
  .catch((error) => {
    console.error('Error connecting to the database', error)
  })
  .finally(() => mongoose.disconnect())

