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
  title: { type: String, required: true, unique: true },
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
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("recipe", recipeSchema);

const gratinD = new Recipe({ title: "Gratin Dauphinois", cousine: "French" });

// new recipe
gratinD
  .save()
  .then(() => {
    console.log("Saved gratinD");
  })
  .catch(err => {
    console.log("ERROR", err);
  });

// import recipes

Recipe.insertMany(data, function(err, recipe) {
  if (err) {
    console.log("An error happened:", err);
  } else
    recipe.forEach(recipeI => {
      console.log(recipeI.title);
    });
});
