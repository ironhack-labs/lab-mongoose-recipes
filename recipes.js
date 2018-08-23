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

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    level: {
      type: String,
      enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
    },
    ingredients: Array,
    cusine: { type: String, required: true },
    dishType: {
      type: String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image: {
      type: String,
      default: "https://images.media-allrecipes.com/images/75131.jpg."
    },
    duration: { type: Number, min: 0 },
    creator: String,
    created: { type: Date, default: new Date() }
  })
);

new Recipe({
  title: "Soup",
  cusine: "German"
})
  .save()
  .then(() => {
    Recipe.insertMany(data).then(response => {
      Recipe.find({})
        .then(recipes => {
          console.log(recipes);
          recipes.map(el => console.log(el.title));
        })
        .then(() => {
          return Promise.all([
            Recipe.updateOne(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            ),
            Recipe.remove({ title: "Carrot Cake" })
          ]).then(() => {});
        })
        .then(result => {
          console.log("Changed!", result);
          mongoose.connection.close().then(response => console.log(response));
        })
        .catch(console.error);
    });
  });
