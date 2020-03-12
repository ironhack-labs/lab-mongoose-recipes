const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("../data"); // Import of the data from './data.js'

const recipeSchema = new Schema({
  title: String,
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

Recipe
.create({
  title: "Cookies",
  level: "Amateur Chef",
  ingredients: ["flour", "chocolate", "sugar", "butter", "eggs"],
  cuisine: "International",
  dishType: "Dessert",
  duration: "30",
  creator: "Sybille",
})

.then((recipe) => {
  console.log("Recipe created: ", recipe);
})
.catch(error => {
  console.log("error: ", error);
});

Recipe
  .insertMany(data)
  .then(recipe => {
    recipe.forEach(oneRecipe => console.log("Success! Recipes added: ", oneRecipe.title));
  })
  .catch(error => {
    console.log("error: ", error);
  });

Recipe
  .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => {
    console.log("Success! Recipe updated");
  })
  .catch(error => {
    console.log("error: ", error);
  });

Recipe
  .remove({ title: "Carrot Cake" })
  .then(recipe => {
    console.log("Success! Recipe deleted: ", recipe);
  })
  .catch(error => {
    console.log("error: ", error);
  });

mongoose.connection.close(() => {
  console.log('Mongoose default connection disconnected through app termination');
  process.exit(0);
});
