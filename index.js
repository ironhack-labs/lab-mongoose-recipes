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
    recipeProcesses();
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// ITERATION TWO

// Recipe.create({
//   title: "Eggs",
//   level: "Easy Peasy",
//   ingredients: ["Eggs", "Salt"],
//   cuisine: "Breakfast",
//   dishType: "breakfast",
//   duration: 5,
//   creator: "Sam",
// })
//   .then((dbResponse) => {
//     console.log(dbResponse.title);
//   })
//   .catch((dbErr) => {
//     console.log(dbErr);
//   });

// ITERATION THREE

const manyRecipes = [
  {
    title: "Eggs",
    level: "Easy Peasy",
    ingredients: ["Eggs", "Salt"],
    cuisine: "American",
    dishType: "breakfast",
    duration: 5,
    creator: "Sam",
  },
  {
    title: "Toast",
    level: "Easy Peasy",
    ingredients: ["Bread", "Butter"],
    cuisine: "UK",
    dishtype: "snack",
    duration: 2,
    creator: "God",
  },
  {
    title: "Potato Chips",
    level: "Easy Peasy",
    ingredients: ["Literally just a bag of chips"],
    cuisine: "Not caring",
    dishtype: "main_course",
    duration: 0.2,
    creator: "Lays",
  },
];

function insertManyRecipes() {
  return Recipe.insertMany(manyRecipes).then((dbResponse) => {});
}

// ITERATION FOUR

function updateRecipe() {
  return Recipe.findOneAndUpdate({ title: "Toast" }, { duration: 4 });
}

// ITERATION FIVE

function deleteRecipe() {
  return Recipe.deleteOne({ title: "Potato Chips" });
}

async function recipeProcesses() {
  try {
    const manyRecipes = await insertManyRecipes();
    manyRecipes.forEach((recipe) => console.log(recipe.title));
    const updatedToast = await updateRecipe();
    console.log("Updated the duration.");
    const chips = await deleteRecipe();
    console.log("I ate the chips.");
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
}
