const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const newRecipe = {title: "torta", level: "Easy Peasy", ingredients: ["eggs", "oil"], cuisine: "portuguese", dishType:"main_course", duration: 30, creator: "me"}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
   
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
  Recipe.create(newRecipe)
  .then(recipe => console.log('The recipe is saved and its title is: ', recipe.title))
  .catch(error => console.log('An error happened: ', error))
  
  //Iteration 3
  Recipe.insertMany(data)
    .then(recipe => console.log('The recipe is saved '))
    .catch(error => {
      console.error('Error connecting to the database', error);
    })
