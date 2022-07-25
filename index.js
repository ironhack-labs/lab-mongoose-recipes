const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const omelette = {
  title: "Omelette",
  level: "Easy",
  ingredients: ["3 eggs, beaten", "1 tsp sunflower oil", "1 tsp butter"],
  cuisine: "American",
  dishType: "brunch",
  image:
    "https://i.pinimg.com/originals/a1/81/98/a181982daa404782f1a1f92e24d99374.jpg",
  duration: 10,
  creator: "Tiffany",
  created: new Date(),
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log("omelette imported");
    return Recipe.create(omelette);
  })
  .then(() => {
    console.log("Recipe imported");
    return Recipe.insertMany(data);
  })
  .then(() => {
    console.log("Rigatoni alla Genovese is updated");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    );
  })
  .then(() => {
    console.log("Carrot Cake is deleted from DB");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
