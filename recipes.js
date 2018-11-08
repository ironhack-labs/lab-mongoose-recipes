const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

//---Recipe for testing CRUD---//
const recipeTest = {
  title: 'DOUBLE!!1 Asians Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 //    cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) //    sesame oil', '3 tablespoons Asian chili garlic sauce', '3 //  tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
};
//

//---Mongoose connection area---//
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

mongoose.connection.once('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
//

//Iteration 1 - Recipe Schema
const recipeSchema = new Schema({
  title: { type: String},
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;

//--CRUD functions---//
//Iteration 2 - Create a recipe
function createOneRecipe(obj) {
  Recipe.create(obj)
  .then(results => { console.log(results.title)})
  .catch(err => { console.log('An error has happened', err)})

//Iteration 3 - Insert Many recipes
function bulkInsertRecipes(array){
  Recipe.insertMany(array)
  .then(results => { 
    results.forEach(result => {console.log(result.title)})
    })
  .catch(err => { console.log('An error has happened', err)})
}
}

//Iteration 4 - Update recipe
function updateRecipe(findValue, updatedValue){
  Recipe.updateOne({title: findValue}, {duration: updatedValue})
    .then(results => { console.log('Updated successfully', results)})
    .catch(err => { console.log('An error has happened', err)})
}
  //obs: queria incluir como argumentos a key para o find e para modificar para ser mais flecivel, sem aspas da erro e com aspas nao funciona, como posso proceder?
    //ex: updateRecipe(keyValue, findValue, keyUpdate, updateValue)

//Iteration 5 - Remove a recipe
function removeRecipe(recipeTitle) {
  Recipe.findOneAndRemove({title: recipeTitle})
  .then(results => { console.log('Removed', results.title, 'from collection')})
  .catch(err => { console.log('An error has happened', err)})
}

//Delete all from collection
function deleteAllRecipes(){
  Recipe.deleteMany({})
    .then(results => { console.log("Deleted all from collection")})
    .catch(err => { console.log('An error has happened', err)})
}
//

//---CRUD Calls Bellow---//
//createOneRecipe(recipeTest);

//bulkInsertRecipes(data);

//updateRecipe('Rigatoni alla Genovese', 100);

//removeRecipe('Carrot Cake');

//deleteAllRecipes();