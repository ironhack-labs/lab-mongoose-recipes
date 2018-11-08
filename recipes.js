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
  title: { type: String },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: { type: String, required: true },
  cuisine: { type: String, requerid: true },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: " https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipes", recipeSchema);
module.exports = Recipe;

Recipe.create({
  title: "Asian Glazed Chicken Thighs",
  level: "Amateur Chef",
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
  cuisine: "Asian",
  dishType: ["Dish"],
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
}, (err, recipe) => {
  if(err) {
    console.log("An error happened", err);
  } else {
    console.log("The Recipe is saved: ", recipe.title);
  }
});

Recipe.insertMany(data)
.then(console.log(this.title))
.catch(console.log("Error!"));

Recipe.updateOne({title: "Rigoni alla Genovese"}, { duration: 100})
.then(console.log(this.name, "Updateded"))
.catch(console.log("Error!"));

Recipe.remove({ title: "Carrot Cake"})
.then("Deleted")
.catch("Error!");

mongoose.connection.close();