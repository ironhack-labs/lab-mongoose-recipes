const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://0.0.0.0:27017/recipe-app";

(async () => {
  try {
    // Connect to MongoDB
    const { connection } = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${connection.name}"`);

    // Delete all existing recipes
    await Recipe.deleteMany();
    console.log("All existing recipes deleted");

    // Create a new recipe
    const newRecipe = {
      title: "test",
      level: "Amateur Chef",
      ingredients: ["test"],
      cuisine: "test",
      dishType: "main_course",
      duration: 30,
      creator: "Chef Test",
    };
    const createdRecipe = await Recipe.create(newRecipe);
    console.log(`Recipe created: ${createdRecipe.title}`);

    // Insert many recipes from data.json
    const insertedRecipes = await Recipe.insertMany(data);
    insertedRecipes.forEach(({ title }) => {
      console.log(`Recipe created: ${title}`);
    });

    // Update the duration of a recipe
    const filter = { title: "Rigatoni alla Genovese" };
    const update = { duration: 100 };
    const options = { new: true };
    const updatedRecipe = await Recipe.findOneAndUpdate(
      filter,
      update,
      options
    );
    console.log(
      `Recipe: ${updatedRecipe.title} Duration: ${updatedRecipe.duration}`
    );

    // Delete a recipe
    const deleteFilter = { title: "Carrot Cake" };
    const deleteResult = await Recipe.deleteOne(deleteFilter);
    console.log("Carrot Cake removed successfully:", deleteResult);
  } catch (error) {
    console.error("Error connecting to the database", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
})();
