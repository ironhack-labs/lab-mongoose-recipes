const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });



// #################################################
// ########## Iteration 1 - Recipe Schema ##########
// #################################################

const recipeSchema = new Schema ({
  title: {type: String, required: true, unique: true},
  level: {
    type: String,
    enum : ['Easy Peasy','Amateur Chef', 'UltraPro Chef']
  },
  ingredients: [String],
  cousine: {type: String, required: true},
  dishType: {
    type: String,
    enum : ['Breakfast','Dish', 'Snack', 'Drink', 'Dessert', 'Other'],
  },
  image: {type:String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type: Number, min:0},
  creator: String,
  created: {type: Date, default: Date.now}
})

const Recipe = mongoose.model('Recipe', recipeSchema);



// ###################################################
// ########## Iteration 2 - Create a recipe ##########
// ###################################################

Recipe.create({        
title: 'Publix Chicken Tender Sub',
level: 'UltraPro Chef',
ingredients: ['Chicken Tender', 'Bread', 'Sauce', 'Veggies'],
cousine: 'American',
dishType: ['Dish'],
image: null,
duration: 5,
creator: 'Publix'
},function(err, recipe){
  if(err) console.log("An error occured attempting to create something.", err);
  else console.log("Recipe added:", recipe.title);
})



// #######################################################
// ########## Iteration 3 - Insert Many recipes ##########
// #######################################################

Recipe.insertMany(data, function(err, recipes){
  if(err) console.log("An error occured attempting to insert something.", err);
  else recipes.forEach((recipe)=>{
    console.log("Recipe added:", recipe.title);
  });
})
// Needed to do this because our console.log on the insertMany did not work properly
// Recipe.remove({},function(err, recipe){
//   if(err) console.log("An error", err);
//   else console.log("Another thing happened-->", recipe.title);
// }) 



// #################################################
// ########## Iteration 4 - Update recipe ##########
// #################################################

Recipe.updateOne( {title: "Rigatoni alla Genovese"}, {duration:100})
  .then(recipe => {console.log("Update Successful!")})
  .catch(theError => {console.log(theError)});



// ###################################################
// ########## Iteration 5 - Remove a recipe ##########
// ###################################################

Recipe.remove( {title: "Carrot Cake"}, function(err) {
  if(err) console.log("An error occured attempting to remove something.", err);
  else console.log("Successfully Removed!");
}) 



// ######################################################
// ########## Iteration 6 - Close the Database ##########
// ######################################################

mongoose.disconnect();