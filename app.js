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
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    // Iteration 2 - Create a recipe
    Recipe.create({
      title:'Recipe one',
      level:'Easy Peasy',
      ingredients:['cebolla', 'pimiento', 'sal'],
      cuisine:'cuisine',
      dishType:'Dish',
      image:'',
      duration:'45',
      creator:'Carlos Dominguez',
      created:''
    })

    // Iteration 3 - Insert multiple recipes
    Recipe.create(data)
   })

  .catch(err => console.error('Error connecting to mongo', err));
