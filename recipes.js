const mongoose = require('mongoose');
const data = require('./data.js');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  
const recipeSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: [String],
  cuisine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema);


// Recipe.create({
//   title: 'Chicken Alfredo',
//   level: 'UltraPro Chef',
//   ingredients: ['chicken breast', 'pasta', 'broccoli', 'butter', 'cream', 'cheese', 'spices'],
//   cuisine: 'Italian-American',
//   dishType: 'Dish',
//   duration: 40,
//   creator: 'Me',
// })


// Recipe.insertMany(data)
// .then((response)=> {
// console.log('=--=--=')
// })
// .catch((theError)=> {
// console.log('=;=;=;==;;;=;=;=;', theError)
// })

// Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
// .then((response)=> {
//   console.log('yayayayayay')
// })
// .catch((theError)=> {
//   console.log('nooooooooooooo')
// })

// Recipe.remove({title: 'Carrot Cake'})
// .then((response)=> {
//   console.log('noooooooo my cake')
// })
// .catch((theError)=> {
//   console.log('hahaha my cake!')
// })
