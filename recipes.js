const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: {type: String, unique: true},
  level: {type: String, enum: ['Easy Peasy','Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cuisine: {type:String, required: true},
  dishType: {type:String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
  image: {type:String, default:'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


const RecipeOne = mongoose.model('RecipeOne', recipeSchema);
module.exports = RecipeOne;



RecipeOne.create({ title: 'Ensalada', level:"Easy Peasy", ingredients: ['lechuga','tomate','aceitunas'], cuisine: 'mediterranea', dishType: 'Dish',duration: 5, creator: "Fernando" })
  .then(RecipeOne => {
    console.log('Se ha guardado correctamente', RecipeOne);
  }) 
  .catch(err => {
    console.log('Algo ha fallado', err);
  })
; 

RecipeOne.insertMany(data); 
RecipeOne.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
.then(RecipeOne => {
  console.log('Se ha actualizado correctamente', RecipeOne);
}) 
.catch(err => {
  console.log('Algo ha fallado', err);
}) 

RecipeOne.findByIdAndRemove("5cae050df483ad65ef3a1ddd")
.then(RecipeOne => {
  console.log('Se ha borrado correctamente', RecipeOne);
}) 
.catch(err => {
  console.log('Algo ha fallado', err);
}) 

