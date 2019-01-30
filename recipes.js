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
    title: { type: String, required: true, unique: true},
    level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
    ingredients: {type: Array},
    cuisine: { type: String, required: true},
    dishType: {type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
    image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: { type: Number,  min: 0},
    creator: { type: String},
    created: {type: Date, default: Date.now}
  });

 const Recipe = mongoose.model('Recipe', recipeSchema); 
  module.exports = Recipe;

Recipe.create({
  title: 'My Cake',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Mine',
  dishType: ['Dessert'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}) 
.then(recipe => {
  console.log('A new recipe was added');
})

Recipe.insertMany(data)
  .then(() => {
  })
  .catch(error => console.log(error));


Recipe.updateOne({ name: "Rigatoni alla Genovese"}, {duration: "100"})
  .then(() => {
    console.log('A recipe was updated!');
  })
  .catch(error => console.log(error));


Recipe.deleteOne({ name: "Carrot Cake"})
.then(() => {
  console.log('Carrot Cake recipe was deleted!');
})
.catch(error => console.log(error));

setTimeout(function () {
  mongoose.connection.close()
}, 200);
