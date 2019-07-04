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



  // Recipe.create({
//   title:"Dumplings",
//   level: "Easy Peasy",
//   ingredients: ["Dough", "Sauce", "Pork"],
//   cuisine: "Asian",
//   dishType: "Snack",
// }).then((theRecipe)=>{
//   console.log(theRecipe.title);
// }).catch((err)=>{
//   console.log("There was a problem");
// })

// Recipe.insertMany(recipesList);

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then((theRecipe)=>{
  console.log("Successfully updated!");
})
.catch(()=> {
  console.log("An error has occured!");
});
