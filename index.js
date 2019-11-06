const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true
  })
  .then(() => {
    return Recipe.create({
      title: "Chocolat",
      level: "Easy Peasy",
      ingredient: ["eggs", "cheese"],
      cuisine: "French",
      dishType: "Breakfast",
      duration: 25,
      creator: "Sarah Le Du"
    });
  })
  .then(cookie => {
    console.log("recipe added");
    console.log(cookie);
    return Recipe.insertMany(data);
  })
  .then(list => {
    list.forEach(l => console.log(l.title));
    return Recipe.updateMany(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
  })
  .then(updated => {
    console.log("The modification had been done!");
    return Recipe.deleteMany({ title: "Carrot Cake" });
  })
  .then(deletedRecipe => {
    console.log("Recipe delete");
  })
  .finally(() =>
    mongoose.connection.close(() => {
      console.log("it happened");
    })
  )
  .catch(err => {
    console.error(err);
  });