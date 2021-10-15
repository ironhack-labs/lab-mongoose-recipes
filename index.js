const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let testRecipe = {
  title: 'soup',
  cuisine: 'mexican'
}
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(testRecipe)
    // Run your code here, after you have insured that the connection was made
  })
  .then ((newRecipe)=>{
    console.log('>>NEW TITLE>>>',newRecipe.title)
  })

  .then((newRecipe)=>{
    return Recipe.findByIdAndUpdate()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe
  .insertMany(data)