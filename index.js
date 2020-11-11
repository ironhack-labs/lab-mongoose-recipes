/*jshint esversion: 6 */

const mongoose = require('mongoose');

// Import of the model Recipe from './models/recipe.model.js'
const Recipe = require('./models/recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {

    Recipe.create({

      title: 'Bacon Burger',
      level: 'Easy Peasy',
      ingredients: ['bacon', 'cheese', 'meat burger'],
      cuisine: 'american',
      dishType: 'other',
      image: 'https://images.media-allrecipes.com/images/75131.jpg',
      duration: 15,
      creator: 'Phector27'

    })

      .then(newRecipe => console.log('El método .create() retorna el objeto de la BBDD:', newRecipe, 'La nueva receta se llama', newRecipe.title))
      .then(() => Recipe.insertMany(data))
      .then(newRecipes => console.log('El método .insertMany() inserta el documento en la BBDD:', newRecipes, 'Las nuevas recetas introducidas se llaman:', newRecipes.title))
      .then(() => Recipe.updateOne({ duration: 220 }, { duration: 100 }, { new: true }))// EN MONGODB COMPASS SE ACTUALIZA EL TIEMPO DE LA RECETA Y EN LA CONSOLA NO.
      .then(updateDuration => console.log('El método .findOneAndUpdate() actualiza el dato indicado en la BBDD:', updateDuration, 'Los nuevos minutos son:', 100))
      .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
      .then(deleteRecipe => console.log('El método .deleteOne () elimina el dato indicado en la BBDD', deleteRecipe))
      .then(() => mongoose.connection.close());

    })
      
  .catch(error => console.error('Error connecting to the database', error));