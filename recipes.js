const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./model.js')

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Drop everything
Recipe.deleteMany()
  //Iteration 3
  .then(() => Recipe.insertMany(data)) 
  .then(recipes => {
    console.log("recipes added!")
    //Iteration 4
    return Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(recipe => {
    console.log("recipe updated!")
    //Iteration 5
    return Recipe.deleteOne({title: "Carrot Cake"}) 
  })
  .then(info => {
    console.log("recipe deleted!", info);
  }) 
  //Iteration 6
  .then(() => mongoose.disconnect())
  .catch(err => {console.log(err)})



