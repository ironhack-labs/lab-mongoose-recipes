const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  title: { type: String },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: [] },
  cousine: { type: String },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
  
// Iteration 2 - Create a recipe
let promise1 = Recipe.create({ title: 'Mediterranean Chicken', level: 'Easy Peasy', ingredients: ['3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'], 
                cousine: 'Mediterranean', dishType: ['Dish'], image: 'https://images.media-allrecipes.com/images/75131.jpg', 
                duration: 40, creator: 'Chef Ali', created: Date('2020-12-25') })
  .then((recipe) => { console.log('Title:', recipe.title); })
  .catch((err) => { console.log('An error happened:', err); });

// Iteration 3 - Insert Many recipes
let promise2 = Recipe.insertMany( data )
  .then((recipe) => { 
    for (i=0; i<data.length; i++){
      console.log('Title:', data[i].title);}})
  .catch((err) => { console.log('An error happened:', err); });

// Iteration 4 - Update recipe
let promise3 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then((recipe) => { console.log('Updating successful!'); })
  .catch((err) => { console.log('An error happened:', err); });

// Iteration 5 - Remove a recipe
let promise4 = Recipe.remove({ title: "Carrot Cake" })
  .then((recipe) => { console.log('Removing successful!'); })
  .catch((err) => { console.log('An error happened:', err); });

// Iteration 6 - Close the Database
Promise.all([promise1, promise2, promise3, promise4])
  .then(recipe => { 
    mongoose.connection.close(function () { 
      console.log('Mongoose connection disconnected successful!'); 
    }); 
  })
  .catch((err) => { console.log('An error happened:', err); });