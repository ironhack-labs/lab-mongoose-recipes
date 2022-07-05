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
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe
      .create(
        {
          "title": "Potato Omelette",
          "level": "Amateur Chef",
          "ingredients": [
            "4 eggs",
            "1/2 onion",
            "olive's oil",
            "3 potato",
          ],
          "cuisine": "Spanish",
          "dishType": "main_course",
          "image": "https://img2.rtve.es/i/?w=1600&i=1606754179280.jpg",
          "duration": 40,
          "creator": "Cristian Arranz"
        }
      )
  })
  .then(recipe => console.log(recipe.title))
  .then(() => {
    return Recipe
      .insertMany(data)
  })
  .then(recipes => {
    recipes.forEach(recipe => console.log(recipe.title))
  })
  .then(() => {
    Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    console.log('Rigatoni alla Genovese success updated!')
  })
  .then(() => {
    Recipe
      .deleteOne({ title: 'Carrot Cake' })
  })
  .then(() => {
    console.log('Carrot Cake already deleted!');  
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });