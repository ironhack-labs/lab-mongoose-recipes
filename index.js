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
    // return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

let recipe = {
  title: "Banku & Okro",
  level: "UltraPro Chef",
  ingredients: ["Corn Flour", "Vegetables", "Meat"],
  cuisine: "African",
  duration: 90,
  creator: "El Magnifico"
};
async function createRecipe(fields) {
  try {
    let recipe = await Recipe.create(fields);
    console.log(recipe.title);
  } catch (error) {
    console.log(error);
  }
}

async function addRecipes(recipesData) {
  try {
    let recipes = await Recipe.insertMany(recipesData);
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
  } catch (error) {
    console.log("Something happened", error);
  }
}
async function update(filter, update) {
  try {
    let recipe = await Recipe.findOneAndUpdate(filter, update);
    if (recipe) {
      console.log("Update Successful");
    }
  } catch (error) {
    console.log("Update Unsuccessful", error);
  }
}

async function removeRecipe(filter) {
  try {
    await Recipe.deleteOne(filter);
  } catch (error) {
    console.log(error);
  }
}

async function closeConn() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected Successfully");
  } catch (error) {
    consol.log(error);
  }
}
const asyncFuncList = [
  createRecipe(recipe),
  addRecipes(data),
  update({ title: "Rigatoni alla Genovese" }, { duration: 100 }),
  removeRecipe({ title: "Carrot Cake" })
  // closeConn()
];

(async function executorFunc() {
  for (const fn of asyncFuncList) {
    await fn;
  }
  closeConn();
})();
