const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  
  // Recipe.create ({ 
  //   title: 'Pizza',
  //   level: String,
  //   ingredients: [],
  //   cuisine: 'Italian',
  //   duration: 180,
  //   creator: "Bob",});
          

// Recipe.insertMany(data);

  // Recipe.updateOne({title:"Rigatoni alla Genovese"}, {duration:100})
  // .then(updatedRecipe => {
  //   console.log("updated success ", updatedRecipe);
  // })
  // .catch(err => { 
  //   console.log("error updating ", err); 
  // });

  //  Recipe.deleteOne({title:"Carrot Cake"})
  // .then(deletedRecipe => {
  //   console.log("delete successful ", deletedRecipe);
  // })
  // .catch(err => { 
  //   console.log("error updating ", err); 
  // });


  // Recipe.save((err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('-------------');
  //   }
  // });
  
  


  setTimeout(() => {
    mongoose.disconnect();
  }, 1500)