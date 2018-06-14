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

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({ title: "myrecipe", level: "Easy Peasy", cousine: "German" })
  .then(recipe => {
    console.log("The title is ", recipe.title);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.insertMany(data)
  .then(recipe => {
    data.forEach(elem =>
      console.log("The recipe is saved and the title is ", elem.title)
    );
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.updateOne({ _id: "5b224bb484be990742bd1bc2" }, { duration: 100 })
  .then(recipe => {
    console.log("Updated successfully");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.findByIdAndRemove("5b224bb484be990742bd1bc1")
  .then(recipe => {
    console.log("Remove done");
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

mongoose.disconnect();
