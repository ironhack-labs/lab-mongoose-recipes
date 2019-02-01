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

// The recipes.js file already connects to the recipesApp
// database. Now we need to create a Recipe Schema.
// The schema should have the following fields:

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: ["Easy Peasy", "Amateur Chef", "UltraPro Chef"],
  ingredients: [String],
  cuisine: {
    type: String,
    required: true
  },
  dishType: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"],
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

// Using the Model.create method, you should pass the info
// to create a new recipe. After the creation, you can use
// MongoDB Compass to check everything goes ok.
// After inserting the recipe, you should console.log
// the title of the recipe.

Recipe.create({ title: "New Recipe", cuisine: "type?" })
  .then(recipeDoc => {
    console.log("Recipe CREATE success!", recipeDoc);
  })
  .catch(err => {
    console.log("Recipe CREATE failure!", err);
  });

// Form the data.js file we are importing an array of recipes.
// Using the Model.insertMany method, you should add the entire
// array to the database. After inserting the elements,
// print on the console the title of each recipe.

Recipe.insertMany(data)
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log("HOME PAGE Recipe.find() failed", err);
    response.render("recipe-error.hbs");
  });

// Now you should have six different recipes in the database,
// but there was a mistake in one of them.
// The Rigatoni alla Genovese does not take that long.
// You should update the duration field and set it to 100.
// After updating it, print a success message!

Recipe.updateMany(
  { title: { $eq: "Rigatoni alla Genovese" } },
  { $inc: { duration: 100 } }
)
  .then(results => {
    console.log("Recipe.deleteMany() SUCCESS!", results);
  })
  .catch(err => {
    console.log("Recipe.deleteMany() FAILURE", err);
  });

// Oh oh! The Carrot Cake is no longer available,
// so we need to remove it from the database.
// Using the Model.remove method, remove that recipe from the
// database and display a success message after doing it!

Recipe.deleteMany({ title: { $eq: "Carrot Cake" } })
  .then(results => {
    console.log("Recipe.deleteMany() SUCCESS!", results);
  })
  .catch(err => {
    console.log("Recipe.deleteMany() FAILURE", err);
  });

// After doing all the task you should close the database.
// Otherwise, the connection will keep open.
// Be careful about the asynchrony of all process;
// you should close it after everything is done! 😉
