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

  // Recipe.create({ title: 'Fried Pasta', level:"Easy Peasy", ingredients: ['chicken','rice','oil'], cuisine: "American", ceator: "Sergio"})
  // .then(rec => { console.log('The recipe is saved: ',rec.title) })
  // .catch(err => { console.log('An error happened:', err) });

  // Recipe.insertMany(data)
  // .then((recipe,eachRecObj) => {

  //   recipe.forEach((eachRecipe)=>{

  //     console.log(eachRecipe.title);
  //   });

  // })
  // .catch(err => { console.log('An error happened:', err) });

  // Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100})
  // .then(()=>{console.log("Succesfully updated!")})
  // .catch((err)=>{console.log(err)});
  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(()=>{console.log("Succesfully deleted!")})
  .catch((err)=>{console.log(err)});