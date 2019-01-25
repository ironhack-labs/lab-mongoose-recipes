const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
//Import model from data file to have it available
const data     = require('./data.js');

//Create connection to the DB
mongoose.connect('mongodb://localhost/myRecipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// //Iteration#1 create new Schema
const recipeSchema = new Schema ({
  title       : {type : String, required : true, unique : true},
  level       : {type : String, enum : ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients : [],
  cuisine     : {type : String, required : true},
  dishType    : {type : String, enum : ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']},
  image       : {type : String, default : 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration    : {type : Number, min: 0},
  creator     : {type : String},
  created     : {type : Date, default : Date.now}
})

//Link the Schema with the mongoose model
const Recipe = mongoose.model('Recipes', recipeSchema);

//Iteration#2 Use the Model.create method to pass the info to create a new recipe
// let iteration2 = Recipe.create({
//   title   : 'Homemade Beef Stroganoff',
//   level   : 'Amateur Chef',
//   ingredients : ['2 Pounds Beef Round Steak', 'Salt & Pepper', '4 Tablespoons Butter', '2 Cups Sliced Mushrooms', 'Onion'],
//   cuisine     : 'American',
//   dishType    : ['Dish'],
//   duration    : 30,
//   creator     : 'Chef Pepin'
// })


// Iteration#3 Use Model.insertMany method to add the entire array to the database
function createDB(){
  Recipe.create({
    title   : 'Homemade Beef Stroganoff',
    level   : 'Amateur Chef',
    ingredients : ['2 Pounds Beef Round Steak', 'Salt & Pepper', '4 Tablespoons Butter', '2 Cups Sliced Mushrooms', 'Onion'],
    cuisine     : 'American',
    dishType    : ['Dish'],
    duration    : 30,
    creator     : 'Chef Pepin'
  })
  Recipe.insertMany(data)
} 

//Iteration#4 Use the updateOne method to odify the duration property of one document
function updateDB(){
  Recipe.updateOne({title : 'Rigatoni alla Genovese' }, {duration : 100})
  Recipe.deleteOne({title: 'Carrot Cake'})
  mongoose.connection.close();
}
// let iteration4 = Recipe.updateOne({title : 'Rigatoni alla Genovese' }, {duration : 100})
  
//Iteration#5 Use the Model.remove method to delete one document from database
// let iteration5 = Recipe.deleteOne({title: 'Carrot Cake'})

createDB();
//Iteration#6 Close the database when finish

setTimeout(updateDB, 1500)