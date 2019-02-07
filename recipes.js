const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


  
const recipeSchema = new Schema({
  title: { type: String , unique: true, required: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ]},
  ingredients: { type: String },
  cuisine: {type: Array, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: {type: String},
  created: {type: Date, default: Date.now},
});

const Recipe = mongoose.model('recipe', recipeSchema);


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).then(() => {
      Recipe.create({
      title: 'Sancocho',
      level: 'UltraPro Chef',
      ingredients: 'Papa, pollo, Agua',
      cuisine: ['Colombian'],
      dishType: 'Dish',
      image: 'Imagen',
      duration: 3,
      creator: 'Tu papa',
  })}).then(() => {
    Recipe.insertMany(data);
  }).then(() => {
    return Recipe.find( { title: 'Sancocho'} )
  }).then((myRecipe) => {
      console.log('My recipe is:' + myRecipe)
      return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }})
  }).then(() => {
    console.log('Congratulations! You have updated Rigatoni time')
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  }).then(() => {
    console.log('Congratulations! Deleted!')
  }).then(() => {
    mongoose.connection.close();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
