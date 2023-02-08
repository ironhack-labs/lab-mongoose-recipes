const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recepieArr = require('./data.json')

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    Recipe
      .create({
        title: 'Lemonade',
        level: 'Easy Peasy',
        ingredients: ['water', 'lemons', 'sugar'],
        cuisine: 'Basics',
        dishType: 'drink',
        image: 'https://www.errenskitchen.com/wp-content/uploads/2020/08/lemonade-1-3.jpg}',
        duration: 5,
        creator: 'Lemon tree',
      })
    // Run your code here, after you have insured that the connection was made
  })
  .then(() => {
    return Recipe
      .insertMany(recepieArr)
  })
  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(() => {
    return Recipe
      .deleteOne({ title: 'Carrot Cake' })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close())
