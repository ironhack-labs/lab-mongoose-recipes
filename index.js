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
      .create({
        title: 'pasta salad',
        level: 'Easy Peasy',
        ingredients: ['Pasta', 'salad'],
        cuisine: 'Food',
        dishType: 'main_course',
        duration: 30,
        creator: 'none'
      })
  })
  .then(elm => {
    console.log(elm)
  })
  .then(() => {
    return Recipe.create(data)
  })

  .then(elm => {
    console.log(elm)
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese", duration: 220 },
      { title: "Rigatoni alla Genovese", duration: 100 }
    )
  })
  .then(elm => {
    console.log(elm)
  })

  .then(() => {
    return Recipe.deleteOne(
      { title: "Carrot Cake" })
  })
  .then(elm => {
    console.log(elm)
  })

  .then(() => {
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  }); 
