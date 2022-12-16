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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Iteration 2 - Create a recipe
    // console.log(`You've just added new recipe to you database`);
    return Recipe.create({
      title: "Pelmeni",
      level: "Amateur Chef",
      ingredients: [
        "Flour",
        "Water",
        "Oil",
        "Minced Beef",
        "Onion",
        "Salt",
        "Pepper",
        "Sour Cream",
      ],
      cuisine: "Russian",
      dishType: "main_course",
      // image: "https://img.delo-vcusa.ru/2020/04/pelmeni-moskovskie.jpg",
      duration: 60,
      creator: "Olga",
    });
  })
  .then((newRecipeAdded) => {
    console.log(newRecipeAdded.title);
  })
  // Iteration 3 - Insert multiple recipes
  .then(() => Recipe.insertMany(data))
  .then((allRecipes) => {
    for (let i = 0; i < allRecipes.length; i++) {
      console.log(allRecipes[i].title);
    }
  })
  // Iteration 4 - Update recipe
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      // in order to see updates in the terminal
      { new: true }
    );
  })
  .then((recipeUpdated) => {
    console.log(
      `Success. Document has been updated with duration: ${recipeUpdated.duration}`
    );
  })
  // Iteration 5 - Remove a recipe
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Success. Your recipe was deleted");
  })
  // Iteration 6 - Close the Database
  .then(() => {
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
