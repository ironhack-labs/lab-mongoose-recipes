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
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
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

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
  title: "Tomato Soup",
  level: "Easy Peasy",
  ingredients: "Tomato, soup",
  cuisine: "italian",
  image: "",
  duration: "10",
  creator: "Steph"
})
  .then(Recipe => {
    console.log("The recipe has been created: ", Recipe);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.insertMany(data)
  .then(rec => {
    console.log("The recipes are saved and they are: ", rec);
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(rec => {
        console.log("The recipe has been updated: ", rec);
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(rec => {
            console.log("The recipe has been removed: ", rec);
            mongoose.disconnect();
          })
          .catch(err => {
            console.log("An error happened:", err);
          });
      })
      .catch(err => {
        console.log("An error happened:", err);
      });
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

module.exports = Recipe;
