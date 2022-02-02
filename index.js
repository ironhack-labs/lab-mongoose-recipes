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
    return Recipe
      .create([
        {
          title: 'Vegan Curry', level: 'Amateur Chef',
          ingredients: ['Your favorites vegetables', 'Curry', 'Soja Milk'],
          cuisine: 'vegan', dishType: 'main_course', image: null,
          duration: 20, creator: 'My mum', create: null
        },
        {
          title: 'Spanish Tortilla', level: 'Easy Peasy',
          ingredients: ['Eggs', 'Potatoes', 'ONION FOREVER', 'Love'],
          cuisine: 'traditional', dishType: 'main_course', image: null,
          duration: 40, creator: 'Who knows', create: null
        }
      ])
  })
  .then((myRecipes => {
    myRecipes.forEach(elm => console.log(`${elm.title}`))
    return Recipe.insertMany(data)
  }))
  .then((allRecipes) => {
    allRecipes.forEach(elm => console.log(`${elm.title}`))
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then(info => {
    console.log('Changed:', info)
    return Recipe
      .deleteOne({ title: 'Carrot Cake' })
  })
  .then((elementDeleted) => {
    console.log(elementDeleted)
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

