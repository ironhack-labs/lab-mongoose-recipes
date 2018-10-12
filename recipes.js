const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const recipeSchema = new Schema({
  title: String,
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: Array,
  cuisine: {type: String, require: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min: 0},
  creator: String,
  created: {type: Date, default: Date.now()},
});

const Recipe = mongoose.model('Recipe', recipeSchema);

let p1 = Recipe.create({title: "Chorizo con Nocilla", level: "Easy Peasy"})
.then(result => {
  console.log(result.title)
})
.catch(error => {
  console.log("la cagaste: ", error)
})

let p4 =  Recipe.insertMany(data)
.then(resultado => {
  resultado.forEach(elem =>{
    console.log(elem.title)
  })
})
.catch(error => {
  console.log("la cagaste: ", error)
})

let p2 = Recipe.findOneAndUpdate({title: {$eq: "Rigatoni alla Genovese"}}, {duration: 100})
.then(result => {
  console.log(result.duration);
})
.catch(error => {
    console.log(error);
})

let p3 = Recipe.remove({title: "Carrot Cake"})
.then(result => {
  console.log("Hemos borrado");
})
.catch(error => {
    console.log(error);
})

Promise.all([p1, p4, p2, p3])
.then((result) => {
  mongoose.disconnect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Disconnected of Mongo!');
  }).catch(err => {
    console.error('Error disconnecting to mongo', err);
  });
})
.catch(error => {
  console.log(error);
})

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
