const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./Recipe.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// Recipe.create([{
//     title: "tacos",
//     level: "Easy Peasy",
//     ingredients: ["meat", "cheese", "onion", "tomato"],
//     cuisine: "Mexican",
//     dishType: "Dish",
//     duration: 20,
//     creator: "Rachel"
//     }])
//         .then((Recipe)=>{
//             console.log(Recipe);
//         })
//         .catch((err)=>{
//             console.log(err);
//         })




Recipe.create(data)
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
})