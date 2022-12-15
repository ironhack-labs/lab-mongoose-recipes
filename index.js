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
    const recipeNew = {
      title: "Panna Cotta",
      level: "Amateur Chef",
      ingredients: [
        "Milk",
        "gelatin",
        "Heavy Cream",
        "Granulated Sugar",
        "Vanilla extract",
      ],
      dishtype: "dessert",
      cuisine: "Italian",
      image:
        "https://prettysimplesweet.com/wp-content/uploads/2015/02/Panna-Cotta-2.webp",
      duration: 15,
      creator: "Bob The Builder",
    };
    console.log(recipeNew.title);
    return Recipe.create(recipeNew);

    // Run your code here, after you have insured that the connection was made
  })
  .then(() => Recipe.insertMany(data))
  .then(() => {
    console.log("succes");
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
