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
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.create({
  title: "Mi primera receta",
  level: "Easy Peasy",
  cuisine: "French",
  dishType: "Dish",
  duration: 8,
  creator: "Teresa"
})
  .then(recipe => {
    console.log("The recipe is saved and its value is: ", recipe);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.insertMany(data)
.then(recipe => {
  console.log("The recipes were saved");

  Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:100})
  .then(recipe => {
    console.log("The recipe was updated");

    Recipe.deleteOne({ title: "Carrot Cake"})
    .then(recipe => {
      console.log("The recipe were deleted");
    })
    .catch(err => {
      console.log("An error happened:");
    });
  })

  .catch(err => {
    console.log("An error happened:");
  });
})
.catch(err => {
  console.log("An error happened:");
});



mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
