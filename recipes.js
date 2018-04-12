const mongoose = require('mongoose');
const data = require('./data.js');


const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {type:String, required:true, unique:true},
  level: {type:String, enum:["Easy Peasy", "Amateur Chef", "UltraPro Chef"]},
  ingredients: {type:Array},
  cousine: {type:String, required:true},
  dishType: {type:String, enum:["Breakfast", "Dish", "Snack", "Dessert", "Other"]},
  image: {type:String, default: "https://images.media-allrecipes.com/images/75131.jpg"},
  duration: {type:Number, min: 0},
  creator: {type:String},
  created: {type:Date, default: Date.now}

})


// cousine. Type String. Should be required.
// dishType. Type String. Possible values: Breakfast - Dish - Snack - Drink - Dessert - Other.
// image. Type String. Default value: https://images.media-allrecipes.com/images/75131.jpg.
// duration. Type Number. Min value should be 0.
// creator. Type String
// created. Type Date. By default today.

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


