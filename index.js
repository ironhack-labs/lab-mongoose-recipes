const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let firstRecipe = {
  title: "Sebastians Power Mayo",
  level: "UltraPro Chef",
  cuisine: "sauce",
  dishType: "snack",
  duration: "15",
  creator: "Sebastian",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(async () => {
    await Recipe.create(firstRecipe)
      .then((recipe) =>
        console.log("The recipe is saved and its values are: ", recipe)
      )
      .catch((error) =>
        console.log("An error happened while saving a new recipe:", error)
      );
    // Run your code here, after you have insured that the connection was made
  })
  .then(async () => {
    await Recipe.insertMany(data)
      .then((recipes) =>
        console.log("The recipes are saved and their values are: ", recipes)
      )
      .catch((error) =>
        console.log("An error happened while saving a new recipe:", error)
      );
  })
  .then(async () => {
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then(console.log("Update successful!"))
      .catch((error) =>
        console.log("An error happened while updating the recipe:", error)
      );
  })
  .then(async () => {
    await Recipe.deleteOne({ title: "Carrot Cake" })
      .then(console.log("Delete successful!"))
      .catch((error) =>
        console.log("An error happened while deleting the recipe:", error)
      );
  })
  .then(async () => {
    await mongoose.disconnect(MONGODB_URI)
      .then(console.log(`"Disconnected from database!", {${mongoose.connection.readyState}}`))
      .catch((error) =>
        console.log("An error happened while disconnecting:", error)
      );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
