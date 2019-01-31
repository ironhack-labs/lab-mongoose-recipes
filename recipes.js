const data = require('./data.js');
const mongoose = require('mongoose');
const Recipes = require("./models/recipesSchema.js")
var db = `recipeApp`
var host = `mongodb://localhost/${db}`
// Fixing my account
mongoose.connect(host)
    .then(() => {
    console.log('Connected to Mongo!')
    Recipes.create({ title: 'Patatas fritas con huevo', level:"Easy Peasy", cuisine: 'Old School', dishType: "Dish", duration: 10, creator: "Alfonso" })
      .then(recipe => {console.log(`The recipe was saved and their title is: ${recipe.title}`)
      Recipes.insertMany(data)
        .then(recipe => {recipe.forEach((recipe) => {
          console.log("The recipe was saved and their title is: " + recipe.title)})
          Recipes.updateOne({title: "Rigatoni alla Genovese"}, { duration: 100})
          .then(() => {console.log("You updated the recipe")
          Recipes.deleteOne({title: "Carrot Cake"})
          .then(() => {console.log("Remove sucessful")
          mongoose.disconnect(host)
          .then(() => console.log("DB Disconnected successful!"))
          .catch(() => console.log("An error to disconnect db"))
        })
        .catch(err => console.log("An error happpened: ", err))
        })
        .catch(err => console.log("An error happened: ", err));
        })
        .catch(err => console.log("An error happened: ", err))
    })
      .catch(err => console.log('An error happened:', err));
  })
    .catch(err => {
    console.error('Error connecting to mongo', err);
  });