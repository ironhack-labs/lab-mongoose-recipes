const mongoose = require('mongoose');
const debug = require('debug')('recipe:js')
const Schema   = mongoose.Schema;
const data = require('./data.js')
let i=0;


mongoose.connect('mongodb://localhost:27017/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

// Iteration 1
const recipeSchema = new Schema({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema)


// Iteration 2
Recipe.create({title: 'Salchipapas', level: 'UltraPro Chef', ingredients: ['salchi', 'papas'], cousine: 'Traditional', dishType: 'Drink', image: 'http://as01.epimg.net/tikitakas/imagenes/2016/06/13/portada/1465834158_419538_1465834401_noticia_normal.jpg', duration: 120, creator: 'Leticia Sabater'})
  .then((recipe) => debug(recipe))
  .catch((err) => debug(err))


// Iteration 3
Recipe.insertMany(data)
  .then((data) => debug(data))
  .catch((err) => debug(err))


// Iteration 4
Recipe.updateOne({title:'Rigatoni alla Genovese'},{duration:100})
  .then((success) => debug(`Se ha modificado con exito : ${success}`))
  .catch((err) => debug(err))

// Iteration 5
Recipe.deleteOne({title:"Carrot Cake"})
  .then((success) => debug(`Se ha borrado con exito : ${success}`))
  .catch((err) => debug(err))

// Iteration 6
setTimeout(() => mongoose.connection.close(), 500);
