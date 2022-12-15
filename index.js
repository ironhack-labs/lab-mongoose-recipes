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
    Recipe.create({
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
      // image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 90,
      creator: "Olga",
    });
  })
  .then(() => {
    Recipe.insertMany(data);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { creator: "Omar" },
  { new: true }
)
  .then((result) => {
    console.log(`Success. Document has ben updated: ${result}`);
  })
  .catch((err) => console.log(err));
