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



  Recipe.create({ 
    title: "Chicken Parmasian",
    level: "Easy Peasy",
    ingredients: ["Chicken", "Parmasian Cheese", "Spaghetti", "Sauce"],
    cuisine: "Italian",
    dishType: "Dinner",
    image: "",
    duration: 40,
    creator: "Chef Larrubia",
    created: Date('2020-12-25'),})
    .then(user => { console.log('The user is saved and its value is: ', user) })
    .catch(err => { console.log('An error happened:', err) });

