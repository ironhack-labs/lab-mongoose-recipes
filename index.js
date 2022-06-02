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

    //ITERATION 1
    const createdRecipe = await Recipe.create({
      title: "test recipe",
      level: "Easy Peasy",
      ingredients: ["banana", "apple"],
      cuisine: "random",
      dishType: "breakfast",
      duration: 5,
      creator: "bcz",
    });
    console.log(createdRecipe.title);

    const createdRecipes = await Recipe.create(data);
    createdRecipes.forEach((element) => {
      console.log(element.title);
    });

    const updateRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      {
        $set: { duration: 100 },
      },
      { new: true }
    );

    console.log(`Updated recipe`, updateRecipe);

    await Recipe.deleteOne({ title: "Carrot Cake" });

    console.log(`Delete succesful`);

    await mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
