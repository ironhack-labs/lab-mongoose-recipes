const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Creacion de la primera receta
const createRecipe = () => {
  return Recipe.create(data[0])
    .then(recipe => console.log('Title', recipe.title))
    .catch(err => console.log('An error happened:', err));
}

// Introduccion de array de datos 'data' 
const insertData = () => {
  return Recipe.insertMany(data)
    .then((recipes) => recipes.forEach((elem) => console.log(`titulo: ${elem.title}`)))
    .catch(err => { console.log('An error happened:', err) });
}

// Update 'Rigatoni alla Genovese'
const updateRigatoni = () => {
  return Recipe.updateMany({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(() => console.log('Rigatoni actualizado'))
    .catch((err) => console.log(err))
}

// Delete Carror Cake
const deleteCarrot = () => {
  return Recipe.deleteOne({ title: "Carrot Cake" })
    .then(() => console.log('Carrot Cake deleteado'))
    .catch((err) => console.log(err))
}

//Bonus Find 
const findAsian = () => {
  return Recipe.find({ cuisine: 'Asian' }, 'title')
    .then((recipes) => {
      recipes.forEach((elem) => console.log(`Estas son nuestras recetas asiaticas: ${elem.title}`))
    })
    .catch((err) => console.log(err))
}


createRecipe()
  .then(() => insertData())
  .then(() => updateRigatoni())
  .then(() => deleteCarrot())
  .then(() => findAsian())
  .then(() => mongoose.connection.close())










