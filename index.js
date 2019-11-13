const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  })
  .then(() => {
    return Recipe.create({
      title: "Test",
      level: "Amateur Chef",
      ingredients: ["pepino", "mozarella", "pasta"],
      cuisine: "American",
      dishType: "Breakfast",
      duration: 10,
      creator: "Mr.Molleda",

    })
    .then(recipeCreated => console.log(recipeCreated))
    .catch(err => console.log(err))
  })
  .then(() => {
    return Recipe.insertMany(data)
     

    
  }) 

  .then(dataInserted => {
    dataInserted.forEach( recipe => console.log(recipe.title) )
    return 
  })
  .catch(err => console.log(err))
  




