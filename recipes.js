const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  title: { type: String, required: true }, //UNIQUE?
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cousine: { type: String, required: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: " https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: String, min: 0 },
  creator: { type: String },
  created: {
    type: Date,
    default: Date.now
  }
});
const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
  title: "Currywurst",
  level: "Amateur Chef",
  ingredients: ["1 currywurst", "1 pommes", "1 curry", "1 ketchup", "1 beer"],
  cousine: "german",
  dishType: ["Dish"],
  image: "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
  duration: 5,
  creator: "Chef Laure-Jens"
})
  .then(recipe => {
    console.log("The recipe is saved and its value is: ", recipe);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.insertMany(data)
  .then(recipe => {
    console.log("The user is saved and its value is: ", recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: "100" })
  .then(duration => {
    console.log("The recipe is updated and saved at duration of: ", duration);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => {
    console.log("The Carrot Cake was deleted successfully: ", recipe);
    mongoose.disconnect();
  })
  .catch(err => {
    console.log("An error happened:", err);
  });
