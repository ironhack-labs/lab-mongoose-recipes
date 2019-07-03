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


  // const firstRecipe = new Recipe({
  //   title: "Kimchi Grilled Cheese",
  //   level: "Amateur Chef",
  //   Ingredients: ["Sourdough bread", "butter", "salt", "kimchi", "korean chili paste", "cheddar cheese", "gruyere cheese"],
  //   cuisine: "Asian Fusion", 
  //   dishType: "Dish", 
  //   duration: 25,
  //   creator: "Victoria Kimcheesious", 
  // })

  // firstRecipe.save()
  // .then(()=>{
  //   console.log('yay it worked');
  // })
  // .catch(()=>{
  //   console.log('sorry, didnt work cant save the cat');
  // })


  // Recipe.insertMany(data)
  // .then(()=>{
  //   console.log('yay it worked');
  //   console.log(data);
  // })
  // .catch(()=>{
  //   console.log('sorry, didnt work cant save the cat');
  // })


  // Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  // .then(()=>{
  //   console.log('yay it worked');
  // })
  // .catch(()=>{
  //   console.log('sorry, didnt work cant save the cat');
  // })


  Recipe.deleteOne({title: 'Carrot Cake'})
    .then(()=>{
    console.log('yay it worked');
  })
  .catch(()=>{
    console.log('sorry, didnt work cant save the cat');
  })
