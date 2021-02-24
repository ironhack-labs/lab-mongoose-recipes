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
    const mousakaRecipe = {
      title: "Mousaka",
      level: "Amateur Chef",
      ingredients: [
        "1/2 kg of meat",
        "2 potatoes",
        "2 courgette",
        "2 eggplants",
        "1 tomato",
        "besamel",
        "3 tablespoons minced garlic",
        "salt to taste",
        "pepper to taste",
        "daphne",
        "olive oil",
        "cheese",
      ],
      cuisine: "Greek",
      dishType: "main_course",
      image: "http/www.hellomousaka.png",
      duration: 80,
      creator: "Chef Amalia",
    };
    //Create a new Recipe
    const createRecipes = Recipe.create(mousakaRecipe)
      .then((recipe) =>
        console.log("The recipe is saved and its value is: ", recipe)
      )
      .catch((error) =>
        console.log("An error happened while saving a new recipe:", error)
      );
    console.log(mousakaRecipe.title);
    // return createRecipes; 2nd way to add a recipe: found by luck

    //Insert many
    const insertManyRecipes = Recipe.insertMany(data)
      .then((recipe) =>
        console.log("The recipes are saved and there values are: ", recipe)
      )
      .catch((error) =>
        console.log("An error happened while saving the new recipes:", error)
      );

    //Update One Recipe
    const updateOneRecipe = Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {duration:100},{new: true}
    )
      .then((recipe) =>
        console.log("The recipe is updated and its value is: ", recipe)
      )
      .catch((error) =>
        console.log("An error happened while updating a recipe:", error)
      );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
