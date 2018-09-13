const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const data = require("./data.js");

const createRecipe = () => {
  let recipe = new Recipe({
    title: "Diego con Papas",
    level: "UltraPro Chef",
    ingredients: [
      "1/2 cup rice vinegar",
      "5 tablespoons honey",
      "1/3 cup soy sauce (such as Silver Swan®)",
      "1/4 cup Asian (toasted) sesame oil",
      "3 tablespoons Asian chili garlic sauce",
      "3 tablespoons minced garlic",
      "salt to taste",
      "8 skinless, boneless chicken thighs"
    ],
    cousine: "Spanish",
    dishType: ["Dish"],
    image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    duration: 40,
    creator: "Chef Master"
  });
  return recipe.save();
};

const allRecipes = () => Recipe.insertMany(data);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.collection.drop();
    createRecipe().then(() => {
      allRecipes().then(() => {
        Recipe.find({}, { title: 1, _id: 0 }).then(titles => {
          console.log(titles);
          Recipe.updateOne(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 }
          ).then(() => {
            console.log("Succes");
            mongoose.disconnect();
          });
        });
      });
    });
  })

  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
