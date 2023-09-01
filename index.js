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
    const newRecipe = {
      title: "brigadeiro de biscoito",
      level: "Easy Peasy",
      ingredients: ["condensedMilk", "chocolate", "butter", "biscoitoDeMaizena"],
      cuisine: "brasilian" ,
       dishtype: "dessert",
       duration: 2 ,
       creator: "alineNogueira"
    }
     return Recipe.create(newRecipe);
  })
  .then(recipeFromDatabase => {
    console.log(recipeFromDatabase.title);
  })

  .then(() =>{ 
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {Duration: 100})
  })
  .then(() =>{console.log("Great success")})
  .then(() => {
    return Recipe.deleteOne({title:"Carrot Cake"}),
    console.log("Great Success, no more carrot cake")
  })
  .then(() => {mongoose.connection.close()})
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });