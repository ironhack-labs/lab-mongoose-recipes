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
    level: "Easy Peasy", 
    ingredients: [
      "2 Zwiebeln",
      "4 Knoblauchzehen",
      "1 Stk Ingwer",
      "250g rote Linsen",
      "1 Bd. Koriander oder Petersilie", 
      "1 TL Kurkuma gemahlen",
      "1 TL Koriander gemahlen",
      "1 TL Kreuzkümmel gemahlen",
      "1TL Garam Masala",
      "2 EL Rapsöl", 
      "200g gehackte Tomaten",
      "200 ml Kokosmilch",
      "2 EL Limettensaft", 
      "Pfeffer und salz",
    ],
    cuisine: "Orientalish",
    dishType: "main_course",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 30,
    creator: "Chef Natascha",
    created: Date.now()
  }))

  .then((printTitle => console.log(`Recipe created: ${printTitle.title}`)))

  .then(() => {
  return Recipe.insertMany(data)
  })

  .then((createdmultipleRecipes) => console.log('Multiple recipes added'))

  .catch(err => console.log('Error generating a recipe', err));
