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
  level: {type: String, enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: {type: Array},
  cuisine: {type: String, required: true},
  dishType: {type: String, enum:["Breakfast", "Dish", "Snack", "Drink", "Dessert","Other"]},
  image: {type: String, default:'https://images.media-allrecipes.com/images/75131.jpg.'},
  duration: {type: Number, min:0},
  creator: {type: String},
  date: {type: Date, default: Date.now}
});

const recipe = mongoose.model('Recipe', recipeSchema)

 
recipe.create({title: 'Spaghetti',
level: 'Amateur Chef',
ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
cuisine: 'Asian',
dishType: ['Dish'],
image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
duration: 40,
creator: 'Chef LePapu'},
console.log("Spaghetti")
)

recipe.insertMany(data)
 .then(recipes => {
   recipes.forEach(recipe => {
   });
 })
 .catch(err => {
   console.log(err);
 });

recipe.findByIdAndUpdate("5c6335f1637306c241de4b5c", {duration: 100})
  .then("Duration Changed")
  .catch("Change failed")

recipe.deleteOne({ title: "Carrot Cake"})
  .then("Carrot Cake deleted")
  .catch("Cannot delete Carrot Cake");

//const Recipe = mongoose.model('Recipe', {title: Sr})


mongoose.connection.on('disconnected', () => {  
  console.log('Mongoose default connection disconnected'); 
});