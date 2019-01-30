const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

const Recipe =require('./models/Recipe.js')

function insertRecipes() {
  mongoose.connect('mongodb://localhost/recipeApp')
    .then(() => {
      Recipe.insertMany(data)
      // alternative approach....
      // data.forEach(function(item) {
      //   Recipe.create(item)
      //   .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
      //   .catch(err => { console.log('An error happened:', err) });
      // })
      console.log('Connected to Mongo!');
    }).catch(err => {
      console.error('Error connecting to mongo', err);
    });
}

function updateToni() {
  Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(function(success) {
    console.log("Success! here2", success)  
  })
  .catch(function(error) {
    console.log('error, Human!', error)
  })
}

// Recipe.updateOne({ name: "Rigatoni alla Genovese"}, { duration: 100 }, 
//   function(error, raw) {
//      console.log("callback", error, raw) 
//   })
    // alternative approaches for catchign errors

// Recipe.updateOne({ name: "Rigatoni alla Genovese"}, { duration: 100 })
//   .then((ob) => {
//     console.log("Success! here", ob)
//   })
//   .catch( err => {
//     console.log('error, Human!', err)
//   })

Recipe.deleteOne({title: 'Carrot Cake'})
.then(function(success) {
  console.log("Success! here3", success)  
})
.catch(function(error) {
  console.log('error, Human!', error)
})

//PLAN for closing the database
insertRecipes()
.then
updateToni()
.then
deleteCarrot()
.catch

