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
  // Iteration 2
  .then(() => Recipe.create(
    {
      "title": "Soupe à l'oignon",
      "level": "Amateur Chef",
      "ingredients": [
        "2 quarts (64 oz or 1.9 litres) beef stock (or water with beef bouillon)",
        "about 5 cups (1.5 lbs or 680 g) of thinly sliced yellow onions (do not use sweet onions)",
        "1 Tbsp olive oil",
        "1 tsp Kosher salt",
        "1/4 tsp sugar",
        "3 Tbsp flour",
        "3 Tbsp butter",
        "4 oz (118 ml) dry white wine or dry Vermouth"
      ],
      "cuisine": "French",
      "dishType": "soup",
      "image": "https://source.unsplash.com/FjxEnioTNs0",
      "duration": 45,
      "creator": "Julia Child"
    }
  ))
  .then(recipe => console.log(recipe))
  
  // Iteration 3
  .then(() => Recipe.insertMany(data))
  .then(() => Recipe.find())
  .then(recipes => recipes.forEach(recipe => console.log(recipe.title)))

  // Iteration 4
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then(() => console.log(`Updated item successfully`))

  // Iteration 5
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => console.log(`Removed item successfully`))

  // Iteration 6
  .then(() => mongoose.connection.close())
  .then(() => console.log(`Closed connection successfully`))

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
