const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./recipes-data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

let newRecipe = {
  title: "miXto quente",
  level: "Easy Peasy",
  ingredients: ["pão francês", "queijo", "presunto"],
  cuisine: "Brasileira",
  dishType: "snack",
  image:
    "http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg",
  duration: 5,
  creator: "JOC",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Iteration 2
    const createRecipePromise = Recipe.create(newRecipe);
    console.log(newRecipe.title);
    return createRecipePromise;
  })
  .then(() => {
    //Iteration 3
    const createMultipleRecipes = Recipe.insertMany(data);
    for (const elem of data) {
      console.log(elem.title);
    }
    return createMultipleRecipes;
  })
  .then(() => {
    //Iteration 4
    const updatedRigatoni = Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      { duration: 100 }
    );
    console.log("The recipe was updated with success, woohhooo!");
    return updatedRigatoni;
  })
  .then(() => {
    //Iteration 5
    const removeARecipe = Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("No more carrot cake!");
    return removeARecipe;
  })
  .then(() => {
    //Iteration 6
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// // Recipe.create(newRecipe);
// const createRecipePromise = Recipe.create(newRecipe);
// //createRecipePromise.then(newRecipe => console.log("newRecipe: ", newRecipe))
