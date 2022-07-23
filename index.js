const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
const recipesFromJSON = "./data.json";
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
    return Recipe.create({
      title: "McWhoKnows",
      level: "Amateur Chef",
      ingredients: [
        "1 uncertain procedence meat paddy",
        "2 uncertain flour hamburger bread",
        "1 not so milky cheese",
        "2 defo not bio tomato slices",
        "1 random oz of 3 random sauces",
        "3 or 4 pieces of uncertain lettuce",
      ],
      cuisine: "Fast food",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 2,
      creator: "The McClown himself",
    });
  })
  .then((recipeCreated) => {
    console.log("recipeCreated: ", recipeCreated);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipesList) => {
    recipesList.forEach((recipe) => {
      console.log("recipes from JSON: ", recipe.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRigatoni) => {
    console.log("Successfully updated rigatoni: ", updatedRigatoni);
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((carrotCakeDeleted) => {
    console.log("Successfully deleted required recipe!: ", carrotCakeDeleted);
  })
  .then(() => {
    // for named connection (in case this is one?)
    //adminConnection.close(function () {
    // console.log("Mongoose connection adminConnection closed")
    // })
    mongoose.connection.close(function () {
      console.log("Mongoose connection closed!");
    });
  })
  // .then(() => {
  //   console.log(mongoose.connection);
  // })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
