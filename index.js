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
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Spaghetti Carbonara",
      level: "Easy Peasy",
      ingredients: [
        "spaghetti",
        "eggs",
        "bacon",
        "grated parmesan cheese",
        "garlic",
        "black pepper"
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 30,
      creator: "Max Brandt"
    });
  })
  .then(recipe => {
    console.log(`The recipe "${recipe.title}" was added to the database.`)
  
  })
  .then(() => {
    return Recipe.insertMany(recipes);
  })
  .then(recipes => {
    console.log(`The following recipes were added to the database:`);
    recipes.forEach(recipe => {
      console.log(recipe.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(recipe => {
    console.log(`The recipe "${recipe.title}" was updated successfully.`);
  })
  .then(() => {
    
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(result => {
    console.log(`The recipe "Carrot Cake" was removed successfully.`);
  })
  .catch(error => {
    console.error(`An error occurred: ${error.message}`);
  })
  .finally(() => {
    
    mongoose.connection.close();
  })