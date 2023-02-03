const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then(() => Recipe.deleteMany())
  .then(() => {
    Recipe.insertMany(data)
      .then((recipes) => recipes.forEach((recipe) => console.log(recipe.title)))
      .catch((error) => console.log("An error happened while saving a new recipe:", error));

    Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      .then((recipe) => console.log("The recipe is updated and its value is: ", recipe))
      .catch((error) => console.log("An error happened while updating a recipe:", error));

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then((recipe) => console.log("The recipe is deleted and its value is: ", recipe))
      .catch((error) => console.log("An error happened while deleting a recipe:", error));
  })
  .catch((error) => console.error("Error connecting to the database", error))
  .finally(() => mongoose.connection.close());
