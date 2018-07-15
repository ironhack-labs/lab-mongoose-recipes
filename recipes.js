const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//Recime Schema
const receipeSchema = new Schema ({
  title: String,
  level: {String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cousine: {type: String, required: true}, 
  dishType: {String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now()},
});

//Creamos el schema de recetas en recipe
const recipe = mongoose.model('recipe', receipeSchema);

recipe.create({title: 'Vaquero', cousine: 'Cerdita Peggy'})
  .then((recipe) => {console.log('Hola vaquero, eres un jefe: ', recipe)})
  .catch((err) => {console.log('Mr. Potato es Javi', err)})

recipe.insertMany(data)
  .then((recipe) => {console.log('It works', recipe)})
  .catch((err) => {console.log('No chuta joder', err)});


recipe.updateOne({title: "Rigatoni alla Genovese"},{duration: 100})
  .then((recipe) => {console.log("Hola joder", recipe)})
  .catch((err) => {console.log("Error joder", err)})

recipe.deleteOne({title: "Carrot Cake"})
  .then((recipe) => {console.log("hola joder", recipe)})
  .catch((err) => {console.log("Error joder", err)})

//FALTA ÚLTIMA ITERACIÓN.