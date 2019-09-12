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
 
  let bannaPancakes = {
    title: "bannaPancakes",
    ingredients: ['bananas','butter']
  }
//Iteration 1
//   let recipe = new Recipe(bannaPancakes)
//  recipe.save()

//Iteration 4
//  Recipe.insertMany(data).then(a =>{
//    console.log(a)
//  })
    // Recipe.updateOne({_id: '5d7a62d4754d0715fbaef4d6'}, { duration: 100 }).then(a =>{
    //   console.log(a)
    // })
//Iteration 5
// Recipe.deleteOne({ _id: '5d7a62d4754d0715fbaef4d5' }).then(a =>{
//   console.log(a)
// });

//Iteration 6
mongoose.connection.close()
