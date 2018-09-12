'use strict';

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array,
  },
  cousine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg.'
  },
  duration: {
    type: Number,
    minimum: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });


Recipe.create({
  title: 'Tiramisu',
  level: 'Easy Peasy',
  cousine: 'italian',
  dishType: 'Dessert'
});

Recipe.create(data);

Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {$set : {duration: 100}}, function(err, doc){
  if(err){
      console.log("Something wrong when updating data!");
  }

  console.log(doc)
  
});

Recipe.findOneAndRemove({title:'Carrot Cake'}, function(err, doc){
  if(err){
      console.log("Something wrong when updating data!");
  }

  console.log(doc)
  
});
// Recipe.findByIdAndRemove({"_id": ObjectId("5b996c1c6b075b79d5c307f9")}, function(err, doc){
//   if(err){
//       console.log("Something wrong when updating data!");
//   }

//   console.log(doc)
  
// });

mongoose.connection.close()
