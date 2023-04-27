const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const newRecipe = {
  title: "arroz a la cubana",
  level: "Easy Peasy",
  ingredients: ["arroz", "tomate", "huevo"],
  cuisine: "supervivencia",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 20,
  creator: "Karlos Arguiñano",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  // En el then de abajo, mejor utilizar async / await
  .then(() => {
    return Recipe.create(newRecipe);
  })
  .then((createdRecipe) =>
    console.log("The recipe is saved and its value is: ", createdRecipe)
  )
  .then(() => Recipe.insertMany(data))
  .then(() => console.log("insertMany has inserted: ", data))
  // No me sale el finondeandupdate:
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then(() => {
    console.log("Bon apetit!");
    mongoose.connection.close();
  })
  .catch((error) =>
    console.log("An error happened while saving a new recipe:", error)
  );
