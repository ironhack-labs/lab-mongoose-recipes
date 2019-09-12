const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Iteration 2 - Create a Recipe
const newRecipe = () => {

  let bananaPancakes = {
    title: "Banana Pancakes",
    level: "Easy Peasy",
    ingredients: [
      "2 ripe bananas, mashed",
      "1 cup all-purpose flour",
      "1 tablespoon brown sugar",
      "1 beaten egg",
      "1/4 teaspoon Kosher salt",
      "1 cup milk",
      "2 tablespoons vegetable oil",
      "2 teaspoons baking powder"
    ],
    cuisine: "Homestyle",
    dishType: "Breakfast",
    duration: 15,
    creator: "Chef Enrique"
  };
  let savedRecipe = new Recipe(bananaPancakes);
  savedRecipe.save().then(console.log(savedRecipe.title));
};

// Iteration 3 - Insert Many Recipes

const addManyRecipes = () => {

  Recipe.insertMany(data)
    .then(console.log(Recipe.find({}).map(x => x.title)))
    .catch(err => {
      console.log({ err: err });
      throw err;
    });
};
// Iteration 4 - Update Recipe

const updateOne = () => {

  let target = { title: "Rigatoni alla Genovese" };
  Recipe.findOneAndUpdate(target, { duration: 100 })
    .then(data => console.log("Successfully updated recipe", data))
    .catch(err => {
      console.log({ err: err });
      throw err;
    });
};
// Iteration 5 - Remove a Recipe
const deleteOne = () => {

  let deleteTarget = { title: "Carrot Cake" };
  Recipe.deleteOne(deleteTarget)
    .then(data => console.log(`Successfully removed carrot cake recipe`, data))
    .catch(err => {
      console.log({ err: err });
      throw err;
    });
};
// Iteration 6 - Close the Database
process.on('SIGINT', () => {
  mongoose.connection.close(()=>{
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  })
})