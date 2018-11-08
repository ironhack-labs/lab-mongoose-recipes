const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ["Easy Peasy", "Amateur Chef, UltraPro Chef"] },
  ingredients: { type: Array },
  cuisine: { type: String },
  dishType: { type: String },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: "08/11/2018" }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

module.exports = Recipe;

Recipe.create(
  {
    title: 'Pizza',
    level: 'Easy Peasy',
    ingredients: '["egg", "cheese", "sauce"]',
    cuisine: 'Italy',
    dishType: 'Junkfood',
    //image,
    duration: 30,
    creator: 'Daniel'
    //created
  },
  function (err, recipe) {
    if (err) {
      console.log("An error happened:", err);
    } else {
      console.log("The recipe is saved and its value is: ", recipe);
    }
  }
);
