const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

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
      title: "Palak Paneer",
      level: "UltraPro Chef",
      ingredients: [
        "spinach",
        "paneer",
        "tomatoes",
        "onion",
        "ghee",
        "masalas",
      ],
      cuisine: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 120,
      creator: "Chef India",
      created: "2016-05-18T16:00:00Z",
    }).then((newRecipe) => console.log(`Your recipe is: ${newRecipe.title}`));
  })

  .then(() => {
    return Recipe.insertMany(data).then((recipesFromDB) => {
      recipesFromDB.forEach((oneRecipe) =>
        console.log(`The recipe is: ${oneRecipe.title}`)
      );
    });
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then((updateDetails) =>
      console.log("Recipe successfully updated! Details: ", updateDetails)
    );
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" }).then((deleteDetails) =>
      console.log("Recipe successfully deleted! Details: ", deleteDetails)
    );
  })

  .then(() => {
    mongoose
      .disconnect()
      .then(() => console.log("Disconnected from the database"));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
