// Setup
// -------------------------------------------------------------------------------------------

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

// use the Schema class to create our recipe schema object
// (the schema is the STRUCTURE of documents in the model's collection)
const recipesSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: {
    type: String,
    enum: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"]
  },
  ingredients: [],
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

// the variable "Recipe" is our Mongoose model class
// the "Recipe" model will allow is to make queries on the "recipes" collection
// (Mongoose turns the model's name string "Dog" to the collection names "recipes")
const Recipe = mongoose.model("Recipes", recipesSchema);

// share the "Recipe" variable with other files that require recipes.js
// (Recipe is our Mongoose model that connects to the "recipes" collection)
// module.exports = Recipe;

// Routes
// -------------------------------------------------------------------------------------------

// (C)reate
Recipe.create({ title: "Asian Glazed Chicken Thighs", cuisine: "Asian" })
  // then() callbacks get called if the operation succeeded
  .then(recipeDoc => {
    // recipeDoc is the result of our create() query
    console.log("Recipe CREATE success!", recipeDoc);
  })
  // catch() callbacks get called if the operation FAILS
  .catch(err => {
    console.log("Recipe CREATE FAILURE...", err);
  });

// (R)eading

Recipe.insertMany(data)
  .then(recipeResults => {
    recipeResults.forEach(recipeDoc => {
      console.log(`ONE RECIPE => ${recipeDoc.title}`);
    });
  })
  .catch(err => {
    console.log("insertMany() FAILURE...", err);
  });

// (U)pdate

Recipe.findByIdAndUpdate("5c54550b4837f40f522b1554", {
  $set: { duration: 100 }
})
  .then(recipeDoc => {
    console.log(`Recipe UPDATED ${recipeDoc._id}`);
  })
  .catch(err => {
    console.log("Recipe UPDATE FAILURE...", err);
  });

// (D)elete

Recipe.findByIdAndRemove("5c545766f3fb4a0f808d5218")
  .then(recipeDoc => {
    if (recipeDoc) {
      console.log(`DELETED ${recipeDoc.title} (id: ${recipeDoc._id})`);
    } else {
      console.log("Couldn't find anything to DELETE.");
    }
  })
  .catch(err => {
    console.log("Recipe DELETE FAILURE...", err);
  });
