const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

//----------------task, my code

const recipeSchema = new Schema({
  title : { type: String, unique: true, required: true},
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef' ]},
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other' ]},
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg.' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: '09/06/2018' }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Recipe.create(data)
//   .then((recipe) => { console.log('The recipe is saved and its value is: ', recipe.title) })
//   .catch((err) => { console.log('An error happened:', err) });

// Recipe.findByIdAndUpdate('5b91540f399e9a542fca488a',{ duration: 100})
//   .then((recipe) => { 
//     console.log('The recipe is saved and its value is: ', recipe.duration) 
//   })
//   .catch((err) => { console.log('An error happened:', err) });

Recipe.findByIdAndRemove("5b91540f399e9a542fca4889")
  .then((recipe) => { console.log('a success message!') })
  .catch((err) => { console.log('An error happened:', err) });

//-------------------------------



