const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Mongo!");

    const recipe1 = {
      title: "Taquitos en el espacio",
      level: "UltraPro Chef",
      ingredients: ["tortilla", "patitos", "tripas sin lavar", "tacos de gato"],
      cuisine: "Mexicanil",
      dishType: "Snack",
      duration: 20,
      creator: "Jorge"
    };

    Recipe.create(recipe1)
      .then(newRecipe => {
        console.log(`'${newRecipe.title}' created`);
        Recipe.create(data)
          .then(newRecipes => {
            console.log(`${newRecipes.length} recipes from data created: ${newRecipes.map(e => e.title)}`);
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 },
              { new: true }
            )
              .then(recipe => {
                console.log("Recipe updated", recipe);
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(result => {
                    console.log('Recipe deleted', result);
                    disconnect();
                  })
                  .catch(err => {
                    console.log('Error deleting recipe', err);
                    disconnect();
                  });
              })
              .catch(err => {
                console.log("Error updating recipe", err);
                disconnect();
              });
          })
          .catch(err => {
            console.log("Error creating recipes from data", err);
            disconnect();
          });
      })
      .catch(err => {
        console.log(`Error creating recipe`, err);
        disconnect();
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function disconnect(){
  mongoose.connection.close();
  console.log("Disconnected from MongoDB!");
}