const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .then(()=> {
    //console.log("a")
    return Recipe.create(data[0])
  }) 
  .then((recipe) => {
    console.log("The recipe is saved and it's value is:", recipe.title)
  })
  .then(() => {
    //console.log("b")
    return Recipe.insertMany(data)
  })
  .then((recipe) => {
    console.log(recipe)
    //console.log("c")
  })
  .catch(err => console.error('Error connecting to mongo', err));

