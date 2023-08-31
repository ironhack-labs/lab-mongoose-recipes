const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

const penneCaprese = {
  title: "Penne Parm",
  level: "Easy Peasy",
  ingredients: [
    "penna pasta",
    "tomato sauce",
    "fresh mozz",
    "fresh tomatoes",
    "grilled chicken",
    "fresh basil",
  ],
  cuisine: "Italian",
  dishType: "main_course",
  image: "",
  duration: 20,
  creator: "Erik Torres",
  created: Date("2020-01-21"),
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(penneCaprese);
  })
  .then((addedRecipe) => {
    console.log(`${addedRecipe.title} was added to DB!`);
    return Recipe.insertMany(data);
  })
  .then((addedData) => {
    addedData.forEach((docRR) => {
      console.log(`Added Recipe: ${docRR.title}`);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genevese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Changed duration of Rigatoni alla Genevese!");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Successfully deleted Carrot Cake");
    mongoose.connection.close();
    console.log("Database connection closed");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
//
