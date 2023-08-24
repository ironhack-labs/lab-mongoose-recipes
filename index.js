const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
async function connectDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(
      `Connected to the database: "${mongoose.connection.name}"`
    );
    await Recipe.deleteMany();
    const insertAllRecipesData = await Recipe.insertMany(data);

    console.log(`Added ${insertAllRecipesData.length} recipes to DB:`);

    let counter = 1;
    insertAllRecipesData.forEach((titleRecipe) => {
      console.log(`${counter}. ${titleRecipe.title}`);
      counter++;
    });
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    console.log(`Recipe ${updatedRecipe.title} is updated`);
    
    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe succesfully deleted");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
}

connectDatabase();