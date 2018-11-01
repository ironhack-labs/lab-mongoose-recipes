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
    title : {type: String, require:true, unique:true}, 
    level: {type: String, enum: ['Easy Peasy', 'Amateur Chef','UltraPro Chef']},
    ingredients: Array,
    cuisine: {type: String, required:true},
    dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other']},
    image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type: Number, min:0},
    creator: String,
    created: {type: Date, default: Date.now}
  });

  const Recipe = mongoose.model('Recipe', recipeSchema);


// Commenting this so that we don't get duplicate-related errors

//   Recipe.create({
//     title : "orangen saft",
//     level: "Easy Peasy",
//     ingredients: ['apples', 'sugar', 'flour', 'butter'],
//     cuisine: "British",
//     dishType: 'Dessert',
//     image: "https://cdn.donnahaycdn.com.au/images/content-images/classic_applecrumble.jpg",
//     duration: 60,
//     creator: "Samanta",
//     // created: 01/11/
  
//   })
//   .then((recipe) => { console.log('Recipe title ', recipe.title) })
//   .catch((err) => { console.log('An error happened when creating your recipe:', err) });

//  Recipe.insertMany(
//    data
//   ).then((res) => {
//     console.log('Recipe title is', res.title)
//   }).catch ((err) => {console.log ("An error happened when insertingMany from data.js")})


Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then((recipe) =>  {console.log ("Congrats you updated the duration of your recipe")})
  .catch ((err) => {console.log ("An error happened when updating your recipe")})

  Recipe.findByIdAndRemove("5bdafededf31c2a712f41c4f")
  .then((recipe) =>  {console.log ("Congrats you removed the Carrot Cake")})
  .catch ((err) => {console.log ("An error happened when deleting your carrot cake")})