const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
    recipe.insertMany(data).then(recipes => {
      recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        .then(recipe => {console.log("Successfully Updated")})
        recipe.deleteOne({ title: "Carrot Cake" })
        .then(recipe => {
          console.log("Successfully deleted");
        })
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const RecipeSchema = new Schema({
  title: { type: String, unique: true },
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

const recipe = mongoose.model("Recipe", RecipeSchema);

recipe
  .create({ title: "Tortilla patatas", level: "Easy Peasy", cousine: "Asian" })
  .then(recipe => {
    console.log("The recipe is saved and its value is: ", recipe);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });



