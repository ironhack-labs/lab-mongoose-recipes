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

  // .then(() => {
  //   return Recipe
  //     .create(
  //       {
  //         title: "Gambitas de huelva con vainilla y coco",
  //         level: "Easy Peasy",
  //         duration: "2",
  //         ingredients: ['gambas', 'vainilla', 'coco'],
  //         cuisine: "la cuisine de mi casa"
  //       }
  //     )
  //     .then(newRecipe => console.log('Nueva creación cocineril:', newRecipe.title))
  //     .catch(err => console.log('Hubo un error', err))
  //   // Run your code here, after you have insured that the connection was made
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  .then(() => {
    return Recipe
      .create({
      
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error)
  })
