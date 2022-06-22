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

    Recipe
      .create({
        title: 'fried egg',
        level: 'UltraPro Chef',
        ingredients: ['egg', 'oil', 'salt'],
        cuisine: 'Fusion',
        dishType: 'main_course',
        duration: 27,
        creator: 'Santi'
      })
      .then(recipe => {
        console.log(recipe.title)
        return Recipe.create(data)
      })
      .then(recipes => {
        recipes.forEach(recipe => console.log(recipe.title))
        return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
      })
      .then(recipe => {
        console.log(recipe)
        return Recipe.deleteOne({ title: 'Carrot Cake' },)
      })
      .then(info => {
        console.log(info)
        mongoose.connection.close()
      })
      .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })

