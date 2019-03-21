const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./Schemas/recipeSchema.js');
const recipes = mongoose.Model;
var MongoClient = require('mongodb').MongoClient;

// ,  function(err, db){

mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
}).catch(err => {
  console.error('Error connecting to mongo', err);
});

MongoClient.connect('mongodb://localhost/recipeApp', function(err, db) {


  Recipe.create({ title: 'Brigadeiro', level:"Easy Peasy", ingredients: ['condensend milk', 'chocolate', 'butter'], cuisine: 'brazilian', dishType: 'Dessert', image: 'https://en.wikipedia.org/wiki/Brigadeiro#/media/File:Brigadeiro.jpg' , duration: 10, creator: "Camila and Isabela"})
  .then(recipe => { console.log('The recipe is saved, and it is' , recipe.title) })
  .catch(err => { console.log('An error happened:', err) });


 Recipe.insertMany(data) 
 .then(recipe => { console.log(recipe.title)})
  .catch(err => { console.log('An error happened:', err) });


 Recipe.updateOne({title: 'Rigatoni alla Genovese'},  {duration: 100})
 .then( successCall => {console.log( "Successed updated", successCall) })
 .catch( err => { console.log('An error happened:', err) });

 Recipe.deleteOne({title: 'Carrot Cake'})
 .then( successCall => {console.log( "Successed deleted", successCall) })
 .catch( err => { console.log('An error happened:', err) });

 db.close();

})
