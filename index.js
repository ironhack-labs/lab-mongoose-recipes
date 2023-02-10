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
    // Run your code here, after you have insured that the connection was made
    const firstRecipe = await Recipe.create({
      title: "First",
      level: "Easy Peasy",
      ingredients: ["first one"],
      cuisine: "oui",
      dishType: "breakfast",
      image: "image",
      duration: "1",
      creator: "ismet",
      created: "2002-12-09",
    });
    console.log(firstRecipe.title);

    const newRecipes = await Recipe.insertMany(data);
    newRecipes.forEach((element) => console.log(element.title));

    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" }
    );
    console.log("!!!rigatoni modified");

    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("ciao carrot cake !!!!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
