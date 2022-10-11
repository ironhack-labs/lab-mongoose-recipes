const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

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
    // Recipe.create(data[0])
    //   .then((recipe) => console.log("The recipe save is: ", recipe.title))
    //   .catch((error) => console.log("error: ", error));
    Recipe.create(data)
      .then((recipe) => recipe.map((r) => console.log(r.title)))

      // iteration 4 update
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .catch((error) => console.log(error))
          .then(() => console.log("updated"));
      })
      .catch((error) => console.log("error: ", error));
    // .then(() => {Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 } })
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
