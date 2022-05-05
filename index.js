const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const firstRecipe = data[0];
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    /* return Recipe.deleteMany(); */
  })
  /* .then(() => {
    Recipe.create(data)
      .then((firstRecipe) =>
        console.log(`New recipe added: ${firstRecipe.title}`)
      )
      .catch((err) => console.log(err));
  }) */

  .then(() => {
    /*  Recipe.insertMany(data)
      .then((recipes) =>
        recipes.forEach((recipe) => console.log(`${recipe.title}`))
      )
      .catch((err) => console.log(err)); */

    /* Recipe.findOneAndUpdate(
      
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    )
      .then((recipe) => console.log(`Recipe updated: ${recipe}`))
      .catch((err) => console.log(err)); */

    /*  Recipe.findByIdAndRemove("6273db08de5c0d98afe081dd")
      .then((recipe) => console.log(`Carrot cake deleted: ${recipe}`))
      .catch((err) => console.log(err)); */

    mongoose.disconnect(() => console.log("Disconnected"));
  })
  .then(() => {
    mongoose.disconnect(() => console.log("Disconnected"));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
