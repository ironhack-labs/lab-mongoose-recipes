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
  title: String,
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
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
  creator: String,
  created: { type: Date, default: Date.now() }
});

const recipe = mongoose.model("recipe", recipeSchema);
recipe.collection.drop();
recipe
  .create({
    title: "Spaghetti",
    level: "Easy Peasy",
    ingredients: ["Spaghetti", "Tomatoes"],
    cuisine: "Italian",
    dishType: "Dish",
    duration: 15,
    creator: "Aaron"
  })
  .then(recipe => console.log(recipe.title))
  .catch(error => console.log(error));

recipe
  .insertMany(data)
  .then(data => {
    data.forEach(e => {
      console.log(e.title);
    });
    recipe
      .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(() => console.log("Update succes!"));
    recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("Delete succes!"));
  })
  .then(() => mongoose.connection.close())
  .catch(err => console.log(err));
