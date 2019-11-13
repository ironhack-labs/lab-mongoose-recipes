const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
Recipe.collection.drop()

Recipe.create({
    title: 'tortilla española',
    level: 'Amateur Chef',
    ingredients: ['2eggs', 'potatoes', 'onion', 'salt'],
    cuisine: 'spanish',
    dishType: 'Dish',
    image: 'https://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg',
    duration: 30,
    creator: 'Imanol y Víctor'

  })
  .then(newRecipe => console.log(`La receta ${newRecipe.title} ha sido creada`))
  .then(() => Recipe.insertMany(data))
  .then(allRecipes => {
    allRecipes.forEach(elm => console.log(elm.title))
  })
  .then(() => Recipe.update({title: 'Rigatoni alla Genovese'}, {duration: 100}))
  .then(x => console.log(x))
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
  .then(x => console.log(x))
  .catch(err => `Error al crear la receta: ${err}`)
  .then(mongoose.connection.close())