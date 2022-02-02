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
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create([
        { title: 'Perico', level: 'Easy Peasy', ingredients: ['Eggs', 'Onion', 'Tomatoe'], cuisine: 'Colombian', image: 'https://www.196flavors.com/wp-content/uploads/2018/10/perico-2-FP.jpg', duration: 10 }
      ])
      .then(allRecipes => {
        // allRecipes.forEach(elm => console.log(elm.title))
        return Recipe.insertMany(data)
      })
      .then(allNewRecipes => {
        // allNewRecipes.forEach(elm => console.log(elm.title))
        return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
      })
      .then(() => {
        console.log('Success update!')
        return Recipe.deleteOne({ title: 'Carrot Cake' })
      })
      .then(() => {
        console.log('Successfully deleted!')
        mongoose.connection.close()
      })
      .catch(error => console.log(error))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
