const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


const recipeSchema = new Schema({

 title: {type: String, required: true, unique: true},
 level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
 ingridients: Array,
 cousine: {type: String, required: true},
 dishType: {type: String, enum: ["Breakfast" , "Dish" , "Snack" , "Drink", "Dessert" , "Other"]},
 image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg."},
 duration: {type: Number, min: 0},
 creator: String,
 create: {type: Date, default: Date.now},
})


const Recipe = mongoose.model('Recipe',recipeSchema)

Recipe.collection.drop()
 Recipe.create({title:"Atun picante", leve: "UltraPro Chef", ingridients:["Aceite de sesamo", "soja", "wasabi"],cousine:"Japanese", dishType: "Dish",duration:2,creator:"Papa",},
 (err,recipe)=>{
  if (err) console.log('An error happened:', err);
  else console.log('The user is saved and its value is: ', recipe);
 })

 
 Recipe.insertMany(data,(err,recipe)=>{
  if (err) console.log('An error happened:', err);
  else console.log('The user is saved and its value is: ', recipe);
 })

 Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration: 100},(err,recipe) => {
  if (err) console.log('An error happened:', err);
  else console.log('The user is saved and its value is: ', recipe);
 })

Recipe.deleteOne({title: "Carrot Cake"},(err,recipe) => {
  if (err) console.log('An error happened:', err);
  else console.log('The user is saved and its value is: ', recipe);
 })
setTimeout(()=> mongoose.connection.close(),500)