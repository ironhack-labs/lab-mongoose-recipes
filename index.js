const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const burger = {
  title: "burger",
  level: "Amateur Chef",
  ingredients: ["steack", "salad", "tomatoes", "ketchup", "oignons", "buns"],
  cuisine: "yes",
  dishType: "snack",
  image:
    "https://twisper.com/wp-content/uploads/2020/03/close-up-photo-of-burger-3915906-scaled.jpg",
  duration: 240,
  creator: "Mr BigMac",
  created: "10-15-2021",
};

Recipe.create(burger)
  .then((Recipe) => console.log("The recipe is added: ", Recipe))
  .catch((error) =>
    console.log("An error happened while saving a new recipe:", error)
  );

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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
