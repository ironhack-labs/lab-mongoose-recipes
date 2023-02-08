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

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe
      .create({
        title: 'Noodles',
        ingredients: ['noodles', 'teriyaki sauce', 'eggs'],
        cuisine: 'singapore',
        image: 'https://realfood.tesco.com/media/images/1400x919-SingaporeNoodles-11e8b5fc-0bb4-4dd8-bcaa-3be1a0ba52ca-0-1400x919.jpg',
        level: "Easy Peasy",
        dishType: 'main_course',
        duration: 45,
        creator: 'popular'
      })
      .then(createdRecipe => {
        console.log('Recipe´s name:', createdRecipe.title)
      })
  })
  .then(() => {
    return Recipe
      .insertMany(data) // no hace falta meterlo en un objeto
      .then(dbRecipes => {
        console.log('Todas las recetas', dbRecipes)
      })
      .catch(error => {
        console.log('ERROR', error)
      })
  })

  .then(() => {
    Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
      .then(info => {
        console.log('New Rigatone duration', info)
        console.log('Congrats, Rigatone updated')
      })
  })

  .then(() => {
    Recipe
      .deleteOne({ title: 'Carrot Cake' })
      .then(info => {
        console.log('Carrot Cake deleted', info)
        console.log('Congrats, Carrot Cake deleted')
      })
  })

  .catch(error => {
    console.log('Error connecting to the database', error);
  })

  .finally(() => mongoose.connection.close())