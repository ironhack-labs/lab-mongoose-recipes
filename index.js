const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const myRecipe = {
  title: "chocolate cake",
  level: "Amateur Chef",
  ingredients: ["chocolate", "butter", "flour"],
  cuisine: "French",
  dishType: "dessert",
  duration: 30,
  creator: "Marina",
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create(myRecipe)
      .then((newRecipe) =>
        console.log(`created new recipe: ${newRecipe.title}`)
      )
      .catch((err) => console.log(err));
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((newRecipes) => {
        newRecipes.forEach((recipe) => {
          console.log(`created new recipe: ${recipe.title}`);
        });
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 } /* , { new: true } */
        )
          .then((recipe) => console.log("success update"))
          .catch((err) => console.log(err));
      })

      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then((recipe) => {
            console.log(`deleted with success`);
            mongoose.disconnect(() => console.log("Disconnected"));
          })
          .catch((err) => console.log(err));
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
