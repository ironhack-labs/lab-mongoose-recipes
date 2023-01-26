const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Iteration 2
const newRecipe = new Recipe ({
  title: 'Pipoca de Microondas',
  level: 'Easy Peasy',
  ingredients: [
    '1 Microondas',
    '1 Saco de Pipoca',
    'Sal a gosto',
    'Pimenta do reino a gosto',
    'Pimenta vermelha a gosto',
  ],
  cuisine: 'Brasileira',
  dishType: 'main_course',
  image: 'https://img.cybercook.com.br/receitas/147/pipoca-2-840x480.jpeg?q=75',
  duration: 10,
  creator: 'Felipe Franco',
})

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Iteration 2
    Recipe.create(newRecipe)
    console.log(`Recipe ${newRecipe.title} created successfully!`, newRecipe)
    // Iteration 3
    return Recipe.insertMany(data)
    // Iteration 4
    .then(() => {
      return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set: { duration: 100 }})
    })
    .then (() => {
      console.log('Duration updated successfully!')
    })
    // Iteration 5
    .then(() => {
      return Recipe.deleteOne({ title: 'Carrot Cake' })
    })
    .then(() => {
      console.log('Recipe deleted successfully!')
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  // Iteration 6
  .finally(() => {
    mongoose.connection.close(() => {
      console.log('Closing the connection')
      process.exit(0)
    })
  })