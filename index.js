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

    return Recipe.create({
      title: 'Chilaquiles verdes',
      level: 'UltraPro Chef',
      ingredients: [
        'Tortilla',
        'Chile serrano',
        'Cebolla',
        'Ajo',
        'Tomate verde',
      ],
      cuisine: 'Mexican',
      dishType: 'breakfast',
      duration: 20,
      creator: 'unknown',
    })
  })
  .then(recipe => console.log('Recipe created', recipe.title))
  .then(() => {return Recipe.insertMany(data)})
  .then(recipe => recipe.forEach(element => {
    console.log('Recipe created', element.title)
  }))
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, { "duration": 100}))
  .then(recipe => console.log('Updated recipe!!!', recipe))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake"}))
  .then(recipe => console.log('Recipe removed from database!!!!', recipe))
  .catch(error => console.log('Error creating recipe', error))

.catch(error => {
    console.error('Error connecting to the database', error);
})
.finally(() => mongoose.connection.close())
