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
    return Recipe.create({
      title: "Chocolate Marquise",
      level: "Easy Peasy",
      ingredients: [
        "Dark Chocolate",
        "Butter",
        "Sugar",
        "Cocoa Powder",
        "Egg Yolks",
        "Double Cream",
      ],
      cuisine: "French",
      dishType: "dessert",
      duration: "60",
      creator: "Hugo",
    });
  })
  .then((myRecipe) => {
    console.log("this is my new recipe", myRecipe);
    return Recipe.insertMany(data);
  })
  .then((updatedRecipe) => {
    console.log("this is the updated recipe", updatedRecipe);
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: "100" },
      { new: true }
    );
  })
  .then(() => {
    console.log("success!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
    return mongoose.disconnect();
  });
