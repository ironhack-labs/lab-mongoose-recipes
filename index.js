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
    Recipe
      .create ({
        title: 'Hamburguesa FiveG',
        level: 'Easy Peasy',
        ingredients: ['carne picada', 'tomate', 'lechuga', 'pan'],
        cuisine: 'casera',
        dishType: 'main_course',
        image: 'imagen',
        duration: 7,
        creator: 'Francisco',
      })
      .then(newRecipe => console.log('la nueva receta es ', newRecipe.title))
      .catch(err => console.log('Hubo un error', err))
      
    Recipe
    .create(data)
    .then(newData => console.log('todas las recetas son: ', newData))
    .catch(err => console.log('Hubo un error', err))

    
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
