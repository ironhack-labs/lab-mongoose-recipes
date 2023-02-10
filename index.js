const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', true)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  // Run your code here, after you have insured that the connection was made
  .then(async () => {
    const newRecipe = await Recipe.create({
      title: 'crepes',
      level: 'Easy Peasy',
      ingredients: ['eggs', 'flour', 'beer', 'rhum', 'milk'],
      cuisine: 'Bretagne',
      dishType: 'dessert',
      image: '',
      duration: 20,
      creator: 'unknown',
      created: 01 / 01 / 0001,
    })
    console.log(newRecipe.title);
  })
  .then(async () => {
    const allRecipes = await Recipe.insertMany(data)
    allRecipes.forEach(recipe => {
      console.log(recipe.title);
    })
  })
  .then(async () => {
    await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    )
  })
  .then(async () => {
    await Recipe.findOneAndDelete({ title: 'Carrot Cake' })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.connection.close()
  })


