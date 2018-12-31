const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  const recipesSchema = new Schema ({
    title : {type : String, required : true, unique : true},
    level : {type : String, enum : ["Easy Peasy","Amateur Chef","UltraPro Chef"]}, 
    ingredients : [],
    cuisine : {type : String, required : true},
    dishType : {type : String, enum : ["Breakfast","Dish","Snack","Drink","Dessert","Other"]},
    image : {type : String, default : "https://images.media-allrecipes.com/images/75131.jpg"},
    duration : {type : Number, min : 0},
    creator : {type : String},
    created : {type : Date, default : Date.now},
  });

  const Recipe = mongoose.model('Recipe', recipesSchema);

  Recipe.create({ title: "Pizza", 
                  level: "Easy Peasy",
                  ingredients: ['tomatoes, cheese, pizza base'],
                  cuisine: "mettre la pizza au four et attendre",
                  disType: "Dish",
                  duration: 30,
                  creator: "Justine"})
    .then(recipe => { console.log('The recipe title is: ', recipe.title)})
    .catch(err => { console.log('An error happened:', err) });
 
  Recipe.insertMany(data) 
  .then(recipes => {
    recipes.forEach(function(recipe, index) {console.log('The recipe title is: ', recipe.title)}) 
  })
  .catch(err => { console.log('An error happened:', err)});

  Recipe.update({ title: "Rigatoni alla Genovese" }, { $set : { duration: 100}},  { new: true })
  .then(recipe => { console.log('recipe duration has been updated')})
  .catch(err => {console.log('An error happened:', err)});