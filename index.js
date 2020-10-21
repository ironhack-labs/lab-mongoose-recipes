const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


(async() => {
  try{
    const food = await Recipe.create({
      title: 'Tortilla de patatas',
      level: 'Easy Peasy',
      ingredients: 'Potatoes, Eggs, Onions, Olive Oil, Salt',
      cuisine: 'Spanish',
      dishType: 'main course',
      duration: 15,
      creator: 'Eric',
      })
      console.log(food)
  } catch (error){
    console.log(error)
  }
})()

