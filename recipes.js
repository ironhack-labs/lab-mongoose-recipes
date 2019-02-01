const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema ({
  title: String,
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: Array,
  cuisine: String,
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image:{
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type:Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

const albondigas = {
  title: 'Albondiga',
  level: 'Easy Peasy',
  ingredients: ['Meat', 'Onion', 'Garlic', 'Eggs', 'Flour'],
  cuisine: 'Spanish',
  dishType: 'Dish',
  image: 'https://okdiario.com/img/recetas/2016/11/15/albondigas-en-salsa.jpg',
  duration: 30,
  creator: 'Manolo el del Bombo',
  created: 09/05/1999 };


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).then(() => {
    
    return Recipe.create(albondigas)
  }).then((result) => {
    console.log(`The new recipe is ${result.title}`);
    
    return Recipe.insertMany(data)        
  }).then ((result) => {
    console.log (result);
    return Recipe.updateMany({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 }})
  }).then(() => {
    console.log('Iteration 4 DONE');
    return Recipe.remove({ title: 'Carrot Cake'})
  }).then(() => {
    console.log('Iteration 5 DONE');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('i got an Error', err);
  });

  












