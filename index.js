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
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2

    Model.create({
      "title": "Tacos de queso",
        "level": "Amateur Chef",
        "ingredients": [
          "Tortilla",
          "cheese"
        ],
        "cuisine": "Mexican",
        "dishType": "main_course",
        "image": "",
        "duration": 5,
        "creator": "Chef LeTaque"
    })
    .then(newRecipe => console.log(newRecipe.title))
    .catch(error => console.log("Error creating a new recipe:",error))

    // Iteration 3

    Model.insertMany(data)
    .then(newRecipes => console.log("newRecipes.title:") )
    .catch(error=> console.log("Error Inserting Recipes :",error),

    // Iteration 4

    Model.updateOne({title:"Rigatoni alla Genovese"}, {duration:100})
    .then(() => console.log("Recipe updated successfully!"))
    .catch(error => console.log("Error updating the Recipe", error)),

    // Iteration 5

    Model.deleteOne({title:"Carrot Cake"})
    .then(() => console.log("Recipe Deleted successfully!"))
    .catch(error => console.log("Error deleting the Recipe", error)),

    //Iteration 6
    mongoose.connection.close(()=>console.log("Connection closed"))


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



