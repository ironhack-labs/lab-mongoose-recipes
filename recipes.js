const mongoose = require("mongoose");
const data = require("./data.js");
const Schema = mongoose.Schema;

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
  creator: String,
  created: { type: Date, default: Date.now() }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
let recipe = Recipe.create(
  {
    title: "Fish and chips",
    level: "UltraPro Chef",
    ingredients: ["fish", "electronic component", "secret ingredient"],
    cousine: "IronHack",
    dishType: "Dish",
    duration: 15,
    creator: "Belt",
    created: Date.now()
  },
  () => {
    Recipe.findOne({ title: "Fish and chips" }).exec((err, objs) => {
      if (err) {
        console.log(err);
      } else {
        console.log(objs.title);
      }
    });
  }
);
let recipes = [];
require("./data.js").forEach(e => {
  recipes.push(e);
});
Recipe.insertMany(recipes, () => {
  Recipe.find({}).exec((err, objs) => {
    if (err) {
      console.log(err);
    } else {
      objs.forEach(e => {
        console.log(e.title);
      });
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 },
        err => {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated successful");
            Recipe.deleteOne({ title: "Carrot Cake" }, err => {
              if (err) {
                console.log(err);
              } else {
                console.log("deleted carrots");
                mongoose.connection.close();
              }
            });
          }
        }
      );
    }
  });
});
