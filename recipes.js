const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: [],
    cuisine: {type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
    duration: {type: Number, min: 0},
    creator: String,
    created: {type: Date, default: new Date()}
  })

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.deleteOne({ title: "Carrot Cake"})
  .then((recipe) => { console.log('The recipe is deleted') })
  .catch((err) => { console.log('An error happened:', err) });

// Recipe.create({ 
//   title: 'Hot Chocolate', 
//   level: 'UltraPro Chef', 
//   ingredients: ["milk", "chocolate"],
//   cuisine: "Mexican",
//   dishType: "Drink",
//   duration: 5,
//   creator: "Emina the Pro Chef"
// })
//   .then((recipe) => { console.log('The recipe is saved and its value is: ', recipe) })
//   .catch((err) => { console.log('An error happened:', err) });

  // Recipe.insertMany(data)
  // .then((recipe) => { console.log('The recipe is saved and its value is: ', recipe) })
  // .catch((err) => { console.log('An error happened:', err) });
