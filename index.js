const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    // Iteration 2
    const newRecipe = { title: "ourOwnRecipe", cuisine: "Italian" };
    Recipe.create(newRecipe)
      .then((rep) =>
        console.log("The recipe is saved and its value is: ", rep.title)
      )
      .catch((error) =>
        console.log("An error happened while saving a new recipe:", error)
      );

    // Iteration 3
    return Recipe.insertMany(data)
      .then((rep) =>
        rep.forEach((recipe) =>
          console.log("Titles of the recipes are:", recipe.title)
        )
      )
      .catch((error) =>
        console.log("An error happened while saving a new recipes:", error)
      );
  })

  // Iteration 4
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    mongoose.connection.close(() => {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
