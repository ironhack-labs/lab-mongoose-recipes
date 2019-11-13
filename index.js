const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(x => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
  })
  .then(() => Recipe.create({ title: 'Receta Macarrones', level: 'Easy Peasy', ingredients: ['queso', 'pasta'], cuisine: 'Horno', dishType: 'Snack', duration: 15, creator: 'Borja y Sandra', created: '2019-11-13' }))
  .then(theRecipe => {
    console.log('El titulo de la receta es : ', theRecipe.title)
  })
  .then(x => Recipe.insertMany(data))
  .then(alltheRecipes => {
    alltheRecipes.forEach(recipe => console.log('El titulo de las recetas es', recipe.title))
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(x => {
    console.log('se actualiza la duracion de la receta')
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(x => {
    console.log('Se borra el carrot correctamente')

  })
  .then(x => {
    mongoose.connection.close()
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });


