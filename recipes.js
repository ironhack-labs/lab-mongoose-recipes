const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipeSchema = new Schema({
  title: { type: String, unique: true, required: true },
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
  date: { type: Date, default: Date.now }
});

const recipe = mongoose.model("recipe", recipeSchema);

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .then(()=>{
    recipe.collection.drop();
  })
  .then(() =>  recipe.create({
    title: "Chipss with eggs",
    level: "UltraPro Chef",
    ingredients: ["eggs", "potatoes", "oil"],
    cuisine: "???",
    dishType: "Dish",
    image:
      "http://www.lacocinademasito.com/files/huevos-rotos-con-jamon-y-patatas-660x412.jpg",
    duration: 15,
    creator: "Giorgio",
    created: 17 / 17 / 2000
  }))
  .then(() => recipe.insertMany(data))
  .then(() =>
    recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  )
  .then(() => console.log("update duration succesfully"))
  .then(() => recipe.deleteOne({title: "Carrot Cake"}))
  .then(()=> console.log("deleted succesfully"))
  .then(() => console.log("ok"))
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });