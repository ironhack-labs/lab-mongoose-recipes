'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const recipeSchema = new Schema({
  title:{
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']
  },
  ingredients: {
    type: Array
  },
  cousine: {
    type: String,
    required: true
  },
  dishType:{
    type: String,
    enum: ['Breakfast', 'Dish', 'Snack', 'Drink','Dessert', 'Other']
  },
  image: {
    type: String,
    default: 'https://images.media-allrecipes.com/images/75131.jpg'
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({title: 'Yummi cake', level: 'Easy Peasy', ingredients: '2 eggs, 200gr sugar, 200gr whole wheat, 1 glass milk, etc',
cousine: 'Catalan', dishType: 'Dessert', duration: 30, creator: 'Mirnow'})
 .then((recipe) => {
   console.log(recipe.title);
  })
  .catch((err) => { 
    console.log('An error happened:', err);
  });

Recipe.insertMany(data)
  .then((data) => {
    data.forEach((recipe) => {
      console.log(recipe.title);
    });
  })
  .catch((err) => {
    console.log('An error happened:', err);
  });

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => {
    console.log("Updated recipe!");
  })
  .catch((err) => {
    console.log("Failed update: ", err);
  });

  ///super tired!! not idea how to disconnect the db
  
// mongoose.connection.close()
//   .then(() => {
//     console.log('Desconnected from Mongo!')
//   }).catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

