const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Asian Glazed Chicken Thighs 3",
  level: "Easy Peasy",
  ingredients: [
    "1 cup rice vinegar",
    "3 tablespoohoney",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1cup Asian (toasted) sesame oil",
    "3 tablespoons Asichili garlic sauce",
    "4 tablespoons minced garlic",
    "sato taste",
    "8 skinless, boneless chicken thighs"
  ],
  cuisine: "American",
  dishType: "Breakfast",
  image: "https://images.media-allrecipes.com/userphot720x405/815964.jpg",
  duration: 35,
  creator: "Chef LorePapu"
}).then(createRecipeNew => {
  console.log(createRecipeNew.title);
  Recipe.insertMany(data).then(createdRecipes => {
    createdRecipes.forEach(recipe => {
      console.log(recipe.title);
      return recipe;
    });
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(updatedReciped => {
      console.log("Success update");

      Recipe.deleteOne({ title: "Carrot Cake" }).then(removeRecipe => {
        console.log("Success delete");
        mongoose.connection.close();
      });
    });
  });
});
