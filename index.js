const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    Recipe.collection.drop()
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  })


  .then(()=> Recipe.create({title: 'Gazpacho', level:'Easy Peasy',ingredients:['Tomate','Ajo','Pimiento Verde','Pepino','Pan','Aceite','Vinagre','Sal'],
  cuisine: 'Española', dishType: 'Dish',image: 'https://www.dehippevegetarier.nl/vegetarische-recepten/spaanse-keuken-gazpacho-andaluz/',
  duration: 20, creator: 'Tia Pepa'}))
  .then(recipe => {console.log('Nuestra receta es:',recipe.title)})
  .then(() => Recipe.insertMany(data))
  .then(allTheRecipes => {
    allTheRecipes.forEach(rec => console.log (rec.title))
  })
  .then(()=> Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration: 100 }))
  .then(recipeResults => console.log('Receta actualizada', recipeResults))
  .then(()=> Recipe.deleteOne({title:'Carrot Cake'}))
  .then(() => console.log('Se ha eliminado la Carrot Cake'))
  .then(()=> mongoose.disconnect())

  .catch(err => {console.log('Hubo un error:', err)})



 
