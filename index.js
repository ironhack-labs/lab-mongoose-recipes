const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then(async (x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    try {
      await Recipe.deleteMany();

      // Use insertMany to add multiple recipes
      const insertedRecipes = await Recipe.insertMany(data);

      console.log("Recipes added successfully.");
      console.log(`Number of recipes added: ${insertedRecipes.length}`);

      // Print the title of each added recipe
      console.log("Titles of added recipes:");
      insertedRecipes.forEach((recipe) => {
        console.log(recipe.title);
      });

      const newRecipe = await Recipe.create({
        title: "New Recipe",
        level: "Easy Peasy",
        ingredients: ["Ingredient 1", "Ingredient 2"],
        cuisine: "International",
        dishType: "main_course",
        image: "https://example.com/image.jpg",
        duration: 45,
        creator: "John Doe",
        created: new Date(),
      });

      console.log(`Title of the new recipe: ${newRecipe.title}`);

      // Update the duration of the "Rigatoni alla Genovese" recipe
      await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      );

      await Recipe.deleteOne({ title: "Carrot Cake" });
    } catch (error) {
      // Close the connection after adding recipes and updating duration
      console.error("Error in one of the steps", error);
    } finally {
      // Close the connection after everything is done
      await mongoose.connection.close();
      console.log("Step 6: Closed the database connection");
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
