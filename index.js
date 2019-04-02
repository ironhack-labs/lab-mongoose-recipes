const Recipe = require('./models/recipe.model')
const data = require('./data');
const mongoose = require('mongoose');

require('./config/db.config')

const newRecipe = {
  title: 'Batido de Fresa y Plátano',
  level: 'Amateur Chef',
  ingredients: ['6 Fresas', '2 Plátanos', '250ml Leche'],
  cuisine: 'French',
  dishType: ['Dessert'],
  image: 'Imagine It!',
  duration: 5,
  creator: 'Chef Jennifer'
}

Recipe.create(newRecipe)
  .then (() => {
    console.log(newRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((data) => {
    for(let i of data) {
      console.info("ÑAM ", i.title)
    }
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}}, {new: true})
  })
  .then((x) => {
    console.info(`se añadió a la receta ${x.title} la duración de ${x.duration} minutos`)
    return Recipe.findOneAndRemove({name: "Carrot Cake"})
  })
  .then((removed) => {
    console.info("Carrot Cake se encuentra en ", removed)
  })
  .then(() => {
    return mongoose.connection.close()
  })
  .then(() => {
    console.info("disconnected!")
  })
  .catch(err => console.log(err))
