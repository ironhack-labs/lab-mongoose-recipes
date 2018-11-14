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
    title    : { type: String},
    level :  { type: String, enum: ['Easy Peasy','Amateur Chef','UltraPro Chef' ] },
    ingredients: { type: Array },
    cuisine : {type: String, required: true},
    dishType  :  { type: String, enum: ['Breakfast','Dish','Snack','Drink','Dessert','Other' ] },
    image : { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
    duration  : {type: Number,min: 0},
    creator : {type: String},
    created:  {type: Date, default: Date.now}
  });

  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports = Recipe;
  Recipe.collection.drop();

  //it 2
  Recipe.create({ title: 'Fried eggs', level: 'Easy Peasy', cuisine: 'Spanish' }, function (err, recipe) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The recipe is saved and its title is: ', recipe.title);
    }
  });


  //it 3
  const recipes = require('./data')

  Recipe.insertMany(recipes, function(err,recps){
    if (err){
      console.log('An error happened:', err);
    }
    else{
      recps.forEach(function(recp){
        console.log('The recipe is saved and its title is: ', recp.title);
      })
    }
  });

