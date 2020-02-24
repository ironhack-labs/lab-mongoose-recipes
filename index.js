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
  .then(() => {
    let recipe1 = new Recipe;
    recipe1 = data[0];
    console.log(recipe1);
    
   // x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    
  })
  .catch(err => console.error('Error connecting to mongo', err));
