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

    Recipe
      .create({ title: 'sandrunejos', level: 'Easy Peasy', ingredients: ['garbanzos', 'sal'], cuisine: 'mediterranea', dishType: 'breakfast', duration: 20, creator: 'cocina tradicional' })
      .then(newRecipe => console.log(newRecipe))
      .catch(err => console.log(err))

  })
  .then(() => {
    return Recipe
      .create(data)
  })
  .then(recipes => recipes.forEach(recipe => console.log(recipe.title)))

  // .then(recipes => console.log(recipes))
  .catch(err => console.log(err))

  .then(() => {
    return Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(info => console.log(info))
  .catch(err => console.log(err))


  .then(() => {
    return Recipe
      .deleteOne({ title: 'Carrot Cake' })
  })
  .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
  .catch(err => console.log(err))
  .then(() => {
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });