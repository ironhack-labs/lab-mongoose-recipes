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
  // Iteration 2:
  .then(() => {
    const newRecipe = {
      title: "Jjajangmyeon",
      level: "UltraPro Chef",
      ingredients: ["Pork belly", "Onion", "Green onion", "Korean black bean paste", "Wheat noodles", "Korean pickled yellow raddish", "Cucumber"],
      cuisine: "Korean",
      dishType: "main_course",
      duration: 25
    }

    return Recipe.create(newRecipe)
  })
  .then(response => console.log(response.title))
  
  // Iteration 3:
  .then(() => Recipe.insertMany(data))
  .then(response => response.forEach(element => console.log(element.title)))

  // Iteration 4:
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}))
  .then(() => console.log("Recipe updated"))

  // Iteration 5:
  .then(() => Recipe.deleteOne({name: "Carrot Cake"}))
  .then(() => console.log("Recipe deleted"))

  // Iteration 6:
  .then(() => mongoose.connection.close())
  .then(x => console.log(`Disconnected from database. State: ${mongoose.connection.readyState}`))

  .catch(error => {
    console.error("Error connecting to the database", error);
  });
