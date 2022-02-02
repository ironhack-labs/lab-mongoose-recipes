const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

//asign a variable to database
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe
            .create({
                title: 'Aji de Gallina',
                level: 'Easy Peasy',
                ingredients: [
                  "1/2 cup rice",
                  "200 gr of chicken",
                  "150 gr of cheese",
                  "1/4 cup of milk",
                  "1/2 tablespoons pepper",
                  "1/2 tablespoons chili curcuma",
                  "salt to taste",
                  "1 tablespoons olive oil"
                ],
                cuisine: "Peruvian",
                dishType: "main_course",
                image: "https://okdiario.com/recetas/aji-gallina-3218356",
                duration: 30,
                creator: "Gastón Acurio",
              })
  })
  .then(theNewRecipe => {
    console.log(theNewRecipe.title)
    return Recipe
              .create(data)
  })
  .then(newRecipes => {
    newRecipes.forEach(recipe => {
      console.log(recipe.title)
    })
    return Recipe
             .findOneAndUpdate({ title: "Rigatoni alla Genovese"},{duration:100})
  })
  .then(updateRecipe => {
      console.log("Rigatoni recipe's duration: UPDATED")
      return Recipe
        .deleteOne({ title: "Carrot Cake" })
  })
  .then(deleteRecipe => {
      console.log("Carrot Cake: DELETED")
      mongoose.connection.close()               // Close connection when everything it's OK
  })
  .catch(error => {
      console.error('Error connecting to the database', error);
  });
