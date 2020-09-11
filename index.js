const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipeObj = data[0] 

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  
  .then(() => {
    return Recipe.insertMany(data)  // Iteration 3
  })
  
  .then (recipe => { // Iteration 4
    recipe.forEach(elm => console.log(elm.title))
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese'},{duration: 100})
  })
  
  .then (details => {// Iteration 5
    console.log(details)
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
     
  .then (recipe => { // Iteration 6
    console.log("Recipe Deleted!", recipe)
    return mongoose.connection.close()
  })
  .then()   
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  //  //no Run your code here, after you have insured that the connection was made
  //  // Iteration 2
  //  Recipe
  //  .create(recipeObj)
  //  .then(recipe => console.log(recipe.title))
  //  .catch(error =>
  //    console.log('An error happened while saving a new recipe:', error))

