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
  .then(async () => {
    //Run your code here, after you have insured that the connection was made
    try {
      //Iteration 2
      const createdRecipe = await Recipe.create({
        title: "Falooda",
        cuisine: "Indian",
      });
      console.log(createdRecipe.title);
      //Iteration 3
      const manyRecipe = await Recipe.insertMany(data);
      manyRecipe.forEach((recipe) => console.log(recipe.title));
      //Iteration 4
      const updateOneRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        { new: true }
      );
      console.log(
        "Updated Recipe " +
          updateOneRecipe.title +
          " Updated Duration " +
          updateOneRecipe.duration
      );
     //Iteration 5
      const findDelete = await Recipe.findOneAndDelete({
        title: "Carrot Cake",
      });
      console.log("Deleted Recipe " + findDelete.title);
    } catch (error) {
      console.error("Error in Try" ,error);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  // Iteration 6
  .finally(() => {
    mongoose.connection.close();
    console.log("connection closed");
    // to test if connection is really closed, should throw error
    //  Recipe.deleteMany()
    //   .then(() => console.log("accessible"))
    //    .catch((error) => console.log(error));
  });
