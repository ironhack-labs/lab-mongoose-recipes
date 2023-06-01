const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Hamburger",
      level: "Easy Peasy",
      ingredients: ["Bread", "Ham", "Cheese", "Lettuce", "Egg"],
      cuisine: "USA",
      dishType: "main_course",
      duration: 30,
      creator: "everyone"
    })
  })
  .then(recipe => {
    console.log("Recipe created:", recipe.title);
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.insertMany([{
      title: "Rendang",
      level: "Easy Peasy",
      ingredients: ["Meat", "Coconut Essence", "Chilli", "Garlic"],
      cuisine: "INA",
      dishType: "main_course",
      duration: 60,
      creator: "everyone"
    },
    {
      title: "Blanquette de veau",
      level: "UltraPro Chef",
      ingredients: ["Calf", "Wheat flour", "Carrots", "Rice", "Butter", "Oignons"],
      cuisine: "France",
      dishType: "main_course",
      duration: 60,
      creator: "A french guy in old times"
    },{
      title: "Sate",
      level: "Easy Peasy",
      ingredients: ["Meat", "Coconut Essence", "Chilli", "Garlic"],
      cuisine: "INA",
      dishType: "main_course",
      duration: 30,
      creator: "everyone"
    },
    {
      title: "Bouchée à la reine",
      level: "UltraPro Chef",
      ingredients: ["Wheat flour", "Seafoods", "Rice", "Butter"],
      cuisine: "France",
      dishType: "main_course",
      duration: 60,
      creator: "A french guy in old times (also)"
    },
    {
      title: "Croque Monsieur",
      level: "Easy Peasy",
      ingredients: ["Bread", "Ham", "Cheese", "Butter"],
      cuisine: "France",
      dishType: "main_course",
      duration: 15,
      creator: "Michel Lunarca"
    }])
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log("Recipe created:", recipe.title);
    });
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
