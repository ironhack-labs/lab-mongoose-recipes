const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
// Recipe.create({title: 'Green Curry', cuisine: 'Thai', duration: 45})
//  Recipe.insertMany(data)
  // .then((recipe,eachRec) => {
  //   recipe.forEach(element => {
  //     console.log(element.title);
  //   });
  // Recipe.updateOne({name:"Rigatoni alla Genovese"},{duration: 100})
  //     .then(()=>{
  //       console.log("success");
      
  // })
  Recipe.deleteOne({title:"Carrot Cake"})
  .then(()=>{
    console.log("successfully deleted");
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

