const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");

//ITERATION 1
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: Array,
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

// ITERATION 2
// Recipe.create({
//   title: "Pizza's",
//   cuisine: "italian"
// })
//   // success
//   // then () callbacks get called if the operation is succesful
//   .then(recipeDoc => {
//     console.log("Recipe CREATE worked", recipeDoc);
//   })
//   // error
//   // then () callbacks get called if the operation fails
//   .catch(err => {
//     console.log("Recipe CREATE failed!😓", err);
//   });

//ITERATION 3

Recipe.insertMany(data)
  .then(recipeDoc => {
    console.log("RECIPE INSERT MANY WORKED", recipeDoc);
  })
  .catch(err => {
    console.log("RECIPE INSERT MANY FAILED", err);
  });

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

//ITERATION 4
Recipe.findOneAndUpdate(
  { title: { $eq: "Rigatoni alla Genovese" } },
  { $set: { duration: 100 } }
)
  .then(recipeDoc => {
    console.log("RECIPE INSERT MANY WORKED", recipeDoc);
  })
  .catch(err => {
    console.log("RECIPE INSERT MANY FAILED", err);
  });

//ITERATION 5
Recipe.findOneAndRemove({ title: "Carrot Cake" })
  .then(recipeDoc => {
    console.log(`DELETED ${recipeDoc.name}(id:${recipeDoc._id})`);
  })
  .catch(err => {
    console.log("recipe.findByIdAndRemove() FAILURE", err);
  });
