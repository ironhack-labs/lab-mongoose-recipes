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
    const recipeOne = {
      title: "Lasagne",
      level: "Amateur Chef",
      ingredients: [
        "tomato sauce",
        "cheese",
        "bechamel",
        "minced beef",
        "pasta plates",
      ],
      cuisine: "Italian",
      dishType: "main_course",
      duration: 45,
      creator: "Juan y Marco",
    };

    return Recipe.create(recipeOne);
  })
  .then((recipeOne) => {
    console.log("we have a new recipe added to the DB");
    console.log(recipeOne.title);
    return data;
  })
  .then((data) => {
    return Recipe.insertMany(data);
  })
  .then((dataArray) => {
    console.log("we have a new array of data added to the DB");
    dataArray.forEach((recipe) => {
      console.log(recipe.title);
    });
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => {
    console.log("Duration of 'Rigatoni alla Genovese' has been updated to 100");
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deleteOne) => {
    console.log("The recipe was deleted");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    mongoose.connection.close();
  });
