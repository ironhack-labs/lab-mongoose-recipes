const mongoose = require("mongoose");

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
    console.log("Existing recipes removed");
    const newRecipe = {
      title: "Pancakes",
      dishType: "breakfast",
      level: "Amateur Chef",
      ingredients: "Salt", ////////
      cuisine: "Pakistani",
      dishType: "snack", /////////
      image: "Image Shown",
      duration: 5,
      creator: "Abdullah",
      created: new Date("1990-05-15"),
    };
    return Recipe.create(newRecipe);
  })

  .then((createdRecipe) => {
    console.log(`Added new recipe: ${createdRecipe.title}`);
    // mongoose.connection.close(); // Close the database connection after the operation
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

function insertM() {
  const insert = Recipe.insertMany(data).then((recipess) => {
    console.log("Receipe Inserted");
    recipess.forEach((recipessss) => {
      console.log(recipessss.title);
    });
  });
}
insertM();

function findUpdate() {
  Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: "100" }
  )
    .then(() => {
      console.log("Receipe Update successfully");
    })
    .catch(() => {
      console.log("Error to setting new duration");
    });
}
findUpdate();

function carrot() {
  Recipe.deleteOne({ title: "Carrot Cake" }) // Filter to find the recipe with the specified title
    .then(() => {
      console.log("Carrot Cake deleted successfully");
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error("Error deleting recipe:", error);
      mongoose.connection.close();
    });
}
carrot();
