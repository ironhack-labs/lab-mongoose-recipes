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
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Tacos',
      level: 'Easy Peasy',
      ingredients: [ 'Tortillas', 'Queso', 'Lechuga', 'Pollo'],
      cuisine: 'Mexican',
      dishType: 'main_course', 
      duration: 15,
      creator: 'Dre',
    })
    
  })
  .then(createdRecipe => {
    console.log(createdRecipe)
    
    return Recipe.insertMany(data)
    
  })
  .then(newlyCreatedRecipeArray => {
    newlyCreatedRecipeArray.forEach(el =>{
      console.log(el.title)
    })
    return Recipe.findOneAndUpdate({
      title: 'Rigatoni alla Genovese'
    },{
      duration: 100
    })
  })
  .then(updatedRecipe => {
    console.log(updatedRecipe)
    console.log('Rigatoni alla Genovese updated successfully')

    return Recipe.deleteOne({
      title: 'Carrot Cake'
    })
  })
  .then(() => {
    console.log('Carrot Cake was deleted')

    return mongoose.connection.close()
  })
  .then(() =>{
    console.log("Connection closed")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });