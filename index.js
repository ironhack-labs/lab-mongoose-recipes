const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    /*
    async function createRecipe() {
      const recipe = await Recipe.create({
        title: "Chocolate cake",
        level: "Easy Peasy",
        ingredients: "Chocolate, Sugar, Egg",
        cuisine: "Nice cuisine",
        dishType: "dessert",
        duration: "30",
        creator: "Nico"
      });
    }
    createRecipe();
  */

    async function createRecipes() {
      const newRecipes = await Recipe.insertMany(data);
      let recipeTitle = [];
      newRecipes.forEach((recipe) => {
        recipeTitle.push(recipe.title);
      });
      //console.log(recipeTitle);
      updateRecipe();
      deleteRecipe();
    }
    createRecipes();

    async function updateRecipe() {
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { title: "Rigatoni alla Genovese" },
        {
          duration: 100,
        },
        { new: true }
      );
      //console.log("Duration updated");
    }

    async function deleteRecipe() {
      const deletedRecipe = await Recipe.deleteOne({
        title: "Carrot Cake",
      });
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
