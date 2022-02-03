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
  // .then(() => {
  //   const recipeDetails = {
  //     title: "Pizza Margherita",
  //     level: "Easy Peasy",
  //     cuisine: "Italian",
  //   };
  //   Recipe.create(recipeDetails);
  // })
  // .then((result) => {
  //   console.log(result);
  // })
  .then((result) => {
    return Recipe.insertMany(data);
  })
  .then((result) => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { returnOriginal: false }
    );
  })
  .then(() => {
    console.log("Rigatoni modified");
  })
  .then((result) => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Minus Carrot Cake");
  })
  .then(() => {
    mongoose.connection.close();

  // we had no trouble with closing the DB just in case if we needed an await
  //
  // .then(async() => {
  //   await mongoose.connection.close();
  //})
  })
  .catch((err) => {
    console.log("oops", err);
  });


