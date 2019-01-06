const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const data = require("./data.js");
const Recipe = require("./Models/Recipe");

const firstRecipe = data[0];

//Crud operations of recipe model
//Create

console.log(firstRecipe);

Recipe.create({
  title: firstRecipe.title,
  level: firstRecipe.level,
  ingredients: firstRecipe.ingredients,
  cuisine: firstRecipe.cuisine,
  dishType: firstRecipe.dishType,
  image: firstRecipe.image,
  duration: firstRecipe.duration,
  creator: firstRecipe.creator,
  created: firstRecipe.created
})
  .then(recipe => {
    console.log("The recipe has been created", recipe.title);
  })
  .catch(err => {
    console.log("An error has orcurred", err);
  });

//Create many reciped
Recipe.insertMany(data)
  .then(recipe => {
    console.log("The recipes has been created", recipe.title);
  })
  .catch(err => {
    console.log("An error has ocurred", err);
  });

//Update
Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => console.log("Update successful"))
  .catch(err => console.log("Error updating", err));

//Delete recipe
Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => console.log("The recipe has been deleted", recipe.title))
  .catch(err => console.log("Error deleting recipe", err));

//Close the database connection
mongoose.connection.close(() => {
  console.log("Database closed!!");
});

//Db connection
mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
