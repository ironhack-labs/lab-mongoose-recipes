const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
    //Crear una receta 
    Recipe.collection.drop().then(
      () => {
        addRep('Pepe to bueno', 'UltraPro Chef', ['pepes'], 'mas pepes')
      }
    )
    //Insertar la tabla de datos
    Recipe.insertMany(data)
    // data.forEach(recipe => {
    //   // addRep(recipe.title, recipe.level,recipe.image...)
    // })

    // Update.. Jorge hasta aqui





  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Funcion de crear recetas
const addRep = (repTitle, repLvl, repIng, repCu, repDish, repImg, repDur, repCreator, repCreated) => {

  // instancia del modelo
  const newRep = new Recipe({
    title: repTitle,
    level: repLvl,
    ingredients: repIng,
    cuisine: repCu,
    dishType: repDish,
    image: repImg,
    duration: repDur,
    creator: repCreator,
    created: repCreated,
  })

  // guardado en BBDD
  newRep.save()
    .then(rep => console.log('receta guardada', rep.title))
    .catch(err => console.log('Error', err))
}