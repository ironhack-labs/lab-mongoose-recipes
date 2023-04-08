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
    return Recipe.create({
      title: "Crepe",
      level: "Easy",
      ingredients: ["Farine", "Oeuf", "L'eau", "Sugres"],
      cuisine: "french",
      dishType: "dessert",
      image:
        "https://assets.afcdn.com/recipe/20211122/124598_w1024h768c1cx3176cy2107cxt1161cyt477cxb5347cyb3565.jpg",
      duration: 30,
      creator: "Chef Bruno",
      created: Date.now(),
    })
      .then(function (newreRecipeFromDb) {
        console.log("newreRecipeFromDb=", newreRecipeFromDb.title);
      })
      .catch((error) => {
        console.error("Error receipe creation", error);
      });
  })
  .then(() => {
    return Recipe.insertMany(data)
      .then(function (newRecipesfromDB) {
        for (let i = 0; i < newRecipesfromDB.length; i++) {
          console.log("newreRecipesFromDb=", newRecipesfromDB[i].title);
        }
      })
      .catch((error) => {
        console.error("Error receipes creation", error);
      });
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },

      { new: true }
    )
      .then(function (updateRecipe) {
        console.log(
          "Reciepe updated=",
          `${updateRecipe.title} duration is now ${updateRecipe.duration}`
        );
      })
      .catch((error) => {
        console.log("Error recipe update", error);
      });
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" })
      .then(function (deleteRecipe) {
        console.log("Recipe deleted");
      })
      .catch((error) => {
        console.log("Error reciepe deletion", error);
      });
  })

  .then(values => {
    mongoose.connection.close()
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
