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


  let bananaPancakes = {
    // TODO: write the schema
    title: 'Banana Pancakes',
    ingredients: ['Banana', 'Pancakes'],
    dishType: 'Breakfast',
  }

  let recipe = new Recipe(bananaPancakes);
  recipe.save();

   Recipe.insertMany(data).then(recipe => {
    recipe.forEach(food => {
      console.log(food.title)
    })
   }).catch(error =>{
     console.log(error);
   })



  Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}).then(data =>{
    console.log("success")
  }).catch(error => {
    console.log(error)
  })



  Recipe.deleteOne({title: 'Carrot Cake'}).then(data => {
    console.log(`deleted`)
  }).catch(error => {
    console.log(error)
  })


  mongoose.disconnect()