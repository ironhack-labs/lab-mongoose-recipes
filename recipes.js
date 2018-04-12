const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const Recipe = require('./models/Recipe');

const db = 'mongodb://localhost/recipeApp'

mongoose.connect(db)
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

Recipe.insertMany( data, (error, recipes) => {
  Recipe.updateOne( {title:"Rigatoni alla Genovese"}, {duration:100}, msg => {
    
    console.log(" Rigatoni Updated");
    
    Recipe.deleteOne( {title: "Carrot Cake"}, msg => {
      
      console.log("Carrot Cake removed");
      
      mongoose.disconnect();
    });
  }
 )
} )
