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
  .then(() => {
    Recipe.insertMany(data);
  })
  // Iteration 4 - Update recipe
  .then(() => {
    console.log("Success. Document has been updated");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

// Recipe.findOneAndUpdate(
//   { title: "Rigatoni alla Genovese" },
//   { creator: "Omar" },
//   { new: true }
// )
//   .then((result) => {
//     console.log(`Success. Document has ben updated: ${result}`);
//   })
//   .catch((err) => console.log(err));
