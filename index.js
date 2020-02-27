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
  .catch(err => console.error('Error connecting to mongo', err));


  const myRecipe = { 
    title: "tortilla",
    level: "Amateur Chef",
    ingredients: ["eggs", "potatoes", "onion"],
    cuisine: "Spanish",
    dishtype: "Dish",
    duration: 10,
    creator: "Javi Varela"
  };
  
  Recipe.create(myRecipe)
    .then(myRecipe => console.log('The recipe is saved and its name is: ', myRecipe.title))
    .catch(error =>
      console.log('An error happened while saving a new recipe:', error)
    );
  
  Recipe.insertMany(data)
    .then(data => {
      data.forEach(recipe => console.log('The recipe is saved and its name is: ', recipe.title));
    })
    .catch(error =>
      console.log('An error happened while saving a new recipe:', error)
    );
  
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }) 
    .then(() => console.log('A recipe has been updated'))
    .catch(error =>
      console.log('An error happened while updating a recipe:', error)
    );