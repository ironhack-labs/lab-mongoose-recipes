const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("../data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const recipeSchema = new Schema({
  // TODO: write the schema
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [String],
  cuisine: {
    type: String,
    required: true
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
  },
  image: {
    type: String,
    default: "https://images.media-allrecipes.com/images/75131.jpg"
  },
  duration: {
    type: Number,
    min: 0
  },
  creator: String,
  created: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

Recipe.deleteMany({})
  .then()
  .catch();

let myRecipe = new Recipe({
  title: "Brownies",
  level: "UltraPro Chef",
  ingredients: [
    "1/2 cup brown sugar",
    "2 cups milk",
    "500 grams dark chocolate",
    "3 eggs"
  ],
  cuisine: "American",
  dishType: "Dessert",
  image: "https://images.media-allrecipes.com/userphotos/250x250/3850414.jpg",
  duration: 90,
  creator: "Chef Liran & Head Chef Monroe"
});

myRecipe.save();

Recipe.insertMany(data).then(recipes => {
  for (recipe of recipes) {
    console.log(recipe.title);
    console.log(recipe.duration);
  }
  Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }).then(
    console.log("success")
  );
  Recipe.deleteOne({ title: "Carrot Cake" }).then(
    console.log("86 carrot cake!")
  );
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
