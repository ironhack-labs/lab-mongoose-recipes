const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect(
  "mongodb://localhost/recipeApp", {
    useNewUrlParser: true
  },
  () => {
    console.log("Connected to the database 'recipeApp'");
  }
);

Recipe.deleteMany().then(() => {
    Recipe.insertMany(data)
      .then(recipe => {
        for (let n = 0; n < recipe.length; n++) {
          console.log("The title of the recipe is:", recipe[n].title)
        }
        Recipe.updateOne({
            title: "Rigatoni alla Genovese"
          }, {
            duration: 100
          })
          .then(value => {
            console.log("Value updated to:", duration)
          })

        Recipe.deleteOne({
            name: "Carrot Cake"
          })
          .then(value => {
            console.log("Recipe deleted");

            mongoose.connection.close();
          });
      })
  })
  .catch(error => {
    console.error("Error happened");
  })