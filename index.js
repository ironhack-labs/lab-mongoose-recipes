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
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(data[0]);
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.map(recipe => { console.log(recipe.title) });
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then((update) => {
    update ? console.log('Se actualizó la receta correctamente')
      : console.log('No se actualizó la receta')
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then((deleteOne) => {
    deleteOne.deletedCount === 1 ? console.log('Se borró la receta correctamente') : console.log('No se borró la receta');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.disconnect()
    console.log('Disconnected')
  });