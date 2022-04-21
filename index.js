const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then( () => {
    
   Recipe.insertMany(data) 
    console.log("All the data from data.json")
  })
  .then ( () => {
    data.forEach( (recipe) => {
      console.log(recipe.title)
    })
  })
 
  .then(() => {
    const myRecipe = {
      title: "potatoe salad",
      level:"Easy Peasy",
      cuisine: "German"
    }
    return Recipe.create(myRecipe)
  })
    
    .then( () => {
     
      return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, {duration: 100 })
    })
    .then( () => {
      return Recipe.deleteOne({ title: 'Carrot Cake' })
    })
  .then( () => {
    mongoose.connection.close()
  .then( () => console.log('connection closed')) 
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
