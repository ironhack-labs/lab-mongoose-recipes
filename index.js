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

  // Iteration 2 - Create a recipe

  .then(() => {

    // Run your code here, after you have insured that the connection was made
    return Recipe.create({

      "title": "Brazilian Brigadeiro",
      "level": "Amateur Chef",
      "ingredients": [
        "1/2 spoon of of bla bla bla",
        "5 tablespoons of love",
        "1/3 cup of choccolate",
      ],
      "cuisine": "Brasilian",
      "dishType": "dessert",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      "duration": 40,
      "creator": "Rodri-Isa"
    })

  })

  .then((recipe) => {
    console.log("La nueva receta es:", recipe.title)
  })

  // Iteration 3 - Insert multiple recipes

  .then((recipe) => {

    return Recipe.insertMany(data)

  })


  .then((recipeList) => {
    recipeList.forEach((recipe) => {
      console.log("Los nombres de todas las recetas son:", recipe.title)
    })
  })

  // Iteration 4 - Update recipe

  .then((recipe) => {

    return Recipe.findOneAndUpdate(

      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true } //get the updated document with new duration
    )


  })

  .then((updatedRecipe) => {
    console.log("Your recipe duration was sucessfully updated to:", updatedRecipe.duration)
  })

  // [QUESTION] why this is not bringing the updated list of all recipes? 

  // .then((recipeList) => {
  //   recipeList.forEach((recipe) => {
  //     console.log("Los nombres de las recetas actualizadas son:", recipe.title)
  //   })
  // })

  // Iteration 5 - Remove a recipe

  .then((recipe) => {

    return Recipe.deleteOne(

      { title: "Carrot Cake" },
      console.log("The following recipe was sucessfully deleted")
    )
  })

  // Iteration 6 - Close the Database

  .then((recipe) => {

    mongoose.connection.close(() => { // Close the database connection
      console.log("Database connection is closed.");
    });
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
