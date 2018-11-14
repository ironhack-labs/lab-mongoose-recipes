const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

const recipesSchema = new Schema({
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

const recipes = mongoose.model("recipes", recipesSchema);
module.exports = recipes;

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(()=> recipes.collection.drop())
  .then(() => {
    recipes.create({
      title: "Pasta",
      level: ["Amateur Chef"],
      ingredients: ["1/2 cup pasta", "3 tablespoons salt", "1/3 cup water"],
      cuisine: "Italian",
      dishType: ["Dish"],
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 15,
      creator: "Chef David"
    });
    console.log("Connected to Mongo!");
  })
  .then(() => recipes.insertMany(data))
  .then(() => recipes.updateOne({title: "Rigatoni alla Genovese"},{ duration: 100}))
  .then(() => recipes.deleteOne({title: "Carrot Cake"}))
  .then(() => {
    mongoose.connection.close()
    console.log("ok")
  })
  
  

  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
