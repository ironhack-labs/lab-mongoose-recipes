const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then( () => {
    //Iteration 2 - Create a recipe
    Recipe
      .create({
        title: "Whiskey Sour",
        level: "Amateur Chef",
        ingredients: [
          "2 parts bourbon",
          "1 part lemon juice",
          "½ part sugar syrup",
          "½ part egg white",
          "Cubed ice",
          "To garnish: 1 cherry and an orange slice",
        ],
        cuisine: "World",
        dishType: 'drink',
        image: "https://images.unsplash.com/photo-1541546006121-5c3bc5e8c7b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1947&q=80",
        duration: 5,
        creator: "GOD OF ALL COKTAILS"
      })
      .then(recipe => {
        console.log("You're recipe got added", recipe);
      })
      .catch(error => {
        console.log("Error you're recipe did not got added", error);
      })
    
    })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
