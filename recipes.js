const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },

  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
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
  creator: String,
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .then(() => {
    return Recipe.collection.drop();
  })
  .then(() => {
    return saveRecipe();
  })
  .then(() => {
    return Recipe.insertMany(data).then(() => {
      return Recipe.deleteOne({ title: "Carrot Cake" });
    });
  })
  .then(() => {
    return Recipe.update(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(() => mongoose.disconnect())
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function saveRecipe() {
  return Recipe.create({
    title: "Arroz con atún",
    level: "Easy Peasy",
    ingredients: ["arroz", "atún"],
    cousine: "Spanish",
    dishType: "Dish",
    duration: 20,
    creator: "Yamilet"
  });
}
