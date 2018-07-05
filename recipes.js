const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('connected to Mongo!')
    mongoose.disconnect('mongodb://localhost/recipeApp');

  }).catch(err => {
    console.error('Error disconnecting to mongo', err)
  });

const recipeSchema = new Schema({
  title: {type: String, unique: true, required: true},
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: '2018-07-05'},
})

const newRecipe = mongoose.model('newRecipe', recipeSchema);

// newRecipe.create({
//   title: 'The Example Shit',
//   level: 'Amateur Chef',
//   ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
//   cousine: 'Asian',
//   dishType: ['Dish'],
//   image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
//   duration: 40,
//   creator: 'ya boy'
// })
// .then((newRecipe) => {

// })
// .catch((error) => {

// })

// newRecipe.insertMany(data)
//   .then((newRecipe) => {

//   })
//   .catch((error) => {
  
//   })

  // newRecipe.updateOne({ title: "Rigatoni alla Genovese"} , {duration: 100})
  // .then((newRecipe) => {
  //   console.log('SUCESS');
  // })
  // .catch((error) => {
  
  // })

  // newRecipe.deleteOne({ title: "Carrot Cake"})
  // .then((newRecipe) => {

  // })
  // .catch((error) => {
   
  // })