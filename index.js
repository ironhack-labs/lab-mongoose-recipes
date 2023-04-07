const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newRecipe = { title: 'arroz a la cubana' ,
    level: 'Easy Peasy' ,
    ingredients: [ 'arroz', 'tomate', 'huevo' ] ,
    cuisine: 'supervivencia' ,
    dishType: 'main_course' ,
    image: 'https://images.media-allrecipes.com/images/75131.jpg' ,
    duration: 20 , 
    creator : 'Karlos Arguiñano' , }

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
  Recipe.create(newRecipe)
  })
  .then(recipe => console.log('The recipe is saved and its value is: ', Recipe))
  .then(() => {
    Recipe.insertMany(data)
  .then(recipe => console.log('isertMany has inserted: ', data))
  .catch(error => console.log('An error happened while saving a new recipe:', error));
    // Run your code here, after you have insured that the connection was made
  })

  
