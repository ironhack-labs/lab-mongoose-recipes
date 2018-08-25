const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });
// The recipes.js file already connects to the recipesApp database. Now we need to create a Recipe Schema
const recipeSchema = new Schema({
  title : {type: String, required: true, unique: true},
  level: {type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'] },
  ingredients : Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other'] },
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: { type: Number, min: 0},
  creator: String,
  created: {type: Date, default: '2018-08-25'}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Using the Model.create method, you should pass the info to create a new recipe. 
let promise1 = Recipe.create({ title: 'Blanquette de veau', cousine: 'French'})
// After inserting the recipe, you should console.log the title of the recipe.
.then((recipe) => {console.log(recipe.title)})
.catch((err) =>{console.log('An error happened:', err)})

// Form the data.js file we are importing an array of recipes. Using the Model.insertMany method,
//  you should add the entire array to the database.
//  After inserting the elements, print on the console the title of each recipe.
let promise2 = Recipe.insertMany(data)
.then((data) => {data.forEach(function(elt) {console.log(elt.title)})})
.catch((err) => {console.log('An error happened:', err)})

// Now you should have six different recipes in the database, but there was a mistake in one of them.
//  The Rigatoni alla Genovese does not take that long.
//  You should update the duration field and set it to 100. After updating it, print a success message!
let promise3 = Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then((object)=>{console.log("Duration was successfully updated!")})
.catch((err) => {console.log('An error happened:', err)})

// The Carrot Cake is no longer available, so we need to remove it from the database.
//  Using the Model.remove method, remove that recipe from the database and display a success message after doing it!
let promise4 = Recipe.deleteOne({title: 'Carrot Cake'})
.then((object)=>{console.log("Delete was successfull!")})
.catch((err) => {console.log('An error happened:', err)})

// After doing all the task you should close the database. Otherwise, the connection will keep open.
//  Be careful about the asynchrony of all process; you should close it after everything is done!
Promise.all([promise1, promise2, promise3, promise4])
.then(values => {
  console.log("Changes performed successfully!");
  mongoose.connection.close();
})
.catch((err)=>{console.log('An error happened:', err)})
