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

//1. CREATE A SCHEMA
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
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

// 2. CREATE A NEW DOCUMENT
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;

Recipe.create(
  {
    title: "Risotto",
    level: "Easy Peasy",
    ingredients: ["riz", "wine", "mushrooms"],
    cuisine: "italian",
    dishType: "Dish",
    duration: "30",
    creator: "Sandra et Rita"
  },
  function(err, recipe) {
    if (err) {
      console.log("An error happened:", err);
    } else {
      console.log("The recipe is saved and its value is: ", Recipe);
    }
  }
);

// 3. INSERT MANY RECIPES
// 4. UPDATE RECIPE
// 5. REMOVE A RECIPE

Recipe.insertMany(data, function(err, recipe) {
  if (err) {
    console.log("An error happened:", err);
  } else {
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: "100" })
      .then(() => {
        console.log("Successfull update");
      })
      .catch(() => {
        console.log("Error");
      });
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => {
        console.log("Successfull delete");
      })
      .catch(() => {
        console.log("Error");
      });
    //Recipe ... findOne And Remove ? 
  }
});


