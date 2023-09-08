const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const omeletData = {
      title: "Omelet",
      level: "Easy Peasy",
      ingredients: ["Eggs", "Salt", "Oil"],
      cuisine: "Asian",
      dishType: "breakfast",
      image:
        "https://www.macheesmo.com/wp-content/uploads/2018/08/12-Egg-Party-Omelet-118.jpg",
      duration: 15,
      creator: "Duc",
    };

    // Iteration 2 - Create a recipe
    Recipe.create(omeletData)
      .then(
        (recipe) => console.log("Iteration 2 - Recipe title: ", recipe.title)
        //console.log(recipe.find(title))
      )
      .catch((error) =>
        console.log(
          "Iteration 2 - An error happened while saving a new recipe:",
          error
        )
      );

    //Iteration 3 - Insert multiple recipes
    const recipeData = require("./data.json");
    Recipe.insertMany(recipeData)
      .then((recipe) => {
        for (let i = 0; i < recipe.length; i++) {
          console.log(
            `Iteration 3.${i + 1} - Recipe title ${i + 1}: `,
            recipe[i].title
          );
        }
        //Iteration 4
        Recipe.findOneAndUpdate(
          { _id: recipe[3]._id },
          /*{ name: "Rigatoni alla Genovese" },*/
          { $set: { duration: 100 } },
          { returnOriginal: false },
          function (err, recipe) {
            if (err) {
              console.log("Something wrong when updating data!");
            } else {
              console.log("Iteration 4: ", recipe);
            }
          }
        );
      })
      .then((recipe) => {
        //Iteration 5
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(function (recipe) {
            console.log("Iteration 5 - Carrot Cake deleted", recipe); // Success
          })
          .catch(function (error) {
            console.log(error); // Failure
          });
      })
      .catch((error) => console.log("Iteration 4 error:", error));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .catch((error) =>
    console.log("An error happened while saving a new recipe:", error)
  )
  .finally(() => {
    // If the Node process ends, close the Mongoose connection
    //Iteration 6
    process.on("SIGINT", function () {
      mongoose.connection.close(function () {
        console.log(
          "Iteration 6 - Mongoose default connection disconnected through app termination"
        );
        process.exit(0);
      });
    });
  });
