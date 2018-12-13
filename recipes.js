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

//iteration 1
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

//iteration 2
const Recipe = mongoose.model("Recipe", recipeSchema);

// Recipe.create({ title: "testrecipe", level:"Easy Peasy", cuisine:"Italian"})
//   .then(recipe => { console.log(recipe.title) })
//   .catch(err => { console.log('An error happened:', err) });

//iteration 3
Recipe.remove().then(() => {
  Recipe.insertMany(data)
    .then(recipe => {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].title);
      }
      //iteration 4
      Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
        .then(recipe => {
          console.log("Success!");
        })
        .catch(err => {
          console.log("An error happened:", err);
        });
      //iteration 5
      Recipe.deleteOne({ title: "Carrot Cake" })
        .then(recipe => {
          console.log("Success!");
          mongoose.connection.close();
        })
        .catch(err => {
          console.log("An error happened:", err);
        });
    })
    .catch(err => {
      console.log("An error happened:", err);
    });
});

//iteration 5
