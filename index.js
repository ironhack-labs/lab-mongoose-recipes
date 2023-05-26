const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() =>  Recipe.create ({
    title: "Rote Linsel-Dal", 
    level: "intermediate", 
    ingredients: "Zwiebeln, Knoblauchzehen, Ingwer, rote Linsen, Koriander oder Petersilie, Kurkuma gemahlen, Koriander gemahlen, Kreuzkümmel gemahlen, Garam Masala, Rapsöl, gehackte Tomaten, Kokosmilch, Limettensaft, Pfeffer",
    cuisine: "Orientalish",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 30,
    creator: "EatBetter",
    created: 25-05-2023,
  }))
  .then(() => {
  console.log(`Recipe created`)
  })

  .catch(error => {
    console.error('Error connecting to the database', error)
  })
  