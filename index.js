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
  .then((createdRecipe) => {
    
    createdRecipe = new Recipe ({
      title: "Raquel's famous pad thai",
      level: "UltraPro Chef",
      ingredients: [
        "whatever",
        "goes in",
        "a",
        "pad thai",
        "chicken",
        "noodles",
        "those crispy things"
      ],
      cuisine: "Asian",
      dishType: "main_course",
      image: "https://cjeatsrecipes.com/wp-content/uploads/2022/04/Pad-Thai-Final-scaled.jpg",
      duration: 70,
      creator: "Chef Poletto"
    });

    return Recipe.create(createdRecipe);
    console.log(`the recipe title is: ${createdRecipe.title}`);
  })
// Iteration 3
  .then(() => {
    return Recipe.insertMany(data)
    .then((response) => {
      response.forEach((recipe) => {
        console.log(recipe.title)
      })
    })
  })
  // Iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then((response) => {
      console.log(`old duration is: ${response.duration}`)
    })
  })
  // Iteration 5
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  // Iteration 6
  .then(() => {
    return mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
