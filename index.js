const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const newRecipe = {
  title: 'Pistacho Robao',
  level: 'UltraPro Chef',
  ingredients: ['Pistacho Robao', 'Sal del vecino'],
  cuisine: 'Alta Cocina',
  dishType: 'snack',
  image: 'https://ca.slack-edge.com/T04JKNKM03D-U04K9UMLX88-363ca2f69df8-512',
  duration: 30,
  creator: 'Cristina Gutierrez',
  created: ''
}
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

    return Recipe.deleteMany()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(newRecipe)
  })
  .then(() => {
    return Recipe.insertMany(data)

  })
  .then(recipes => {
    console.log(recipes)
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
  })
  .then()
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



