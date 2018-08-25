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
  title : { type: String, unique: true, required:true },
  level: { type: String, enum: ["Easy Peasy","Amateur Chef","UltraPro Chef"]},
  ingredients : Array,
  cousine:{ type: String, required: true },
  dishType:{ type: String, enum: ["Breaksfast","Dish","Snack","Drink","Dessert","Other"]},
  image:{ type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration:{ type: Number, min: 0},
  creator:String,
  created:{ type: Date, default: Date.now },
});

var Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.create({ title: 'Poulet Basquaise', cousine: 'Paulo' })
  .then((Recipe) => { console.log('The recipe is saved and its value is: ', Recipe) })
  .catch((err) => { console.log('An error happened:', err) });

  Recipe.insertMany(data)
  .then((data) => {data.forEach(function(elt) {console.log(elt.title)})})
  .catch((err) => {console.log('An error happened:', err)})

  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(console.log("Success"))
  .catch(console.log("Error"));