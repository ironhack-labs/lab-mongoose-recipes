const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const exampleRecipe = {
  title: "This is the greatest recipe with chicken",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Mexican",
  dishType: "dessert",
  duration: 30,
  creator: "Chef Laszlo",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(exampleRecipe);
  })
  .then((recipe) => {
    console.log(recipe.title);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((el) => console.log(el.title));
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(updatedRecipe.title + " updated successfully!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log(`${deletedRecipe.deletedCount} items deleted successfully!`);
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
