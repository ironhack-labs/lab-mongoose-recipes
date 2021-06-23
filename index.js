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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.syncIndexes()
  })

  .then(() => {
    return Recipe
      .create({ title: 'eggsWithRice', level: 'Easy Peasy', ingredients: ['rice', 'eggs'], cuisine: 'spanish', dishType: 'main_course' })
      .then(newRecipe => console.log('receta nueva:', newRecipe))
      .catch(err => console.log(' error', err))
  })
  .then(() => {
    return Recipe
      .create(data)
      .then(recipes => console.log('recetas:', recipes))
      .catch(err => console.log(' error', err))
  })
  .then(() => {
    return Recipe
      .findOneAndUpdate({ duration: 220 }, { duration: 100 })
      .then(duration => console.log("La receta dura ahora", duration))
      .catch(err => console.log('error', err))
  })
  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(recipe => console.log('Hemos quitado', recipe))
      .catch(err => console.log('error', err))
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log('DB close')
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
