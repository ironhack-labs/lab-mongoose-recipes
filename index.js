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

// Iteration 2
/* Recipe.create({
  title: "Pizzadcfgffg35",
  level: "Easy peasy",
  ingredients: ["tomatoes", "cheese", "pizzadough", "mushrooms"],
  cuisine: "Italian",
  dishType: "Dish",
  duration: 30,
  creator: "Are"
})
  .then(document => {
    console.log(document.title);
  })
  .catch(err => {
    console.log("ERROR ", err);
  }); */

// Iteration 3
/* Recipe.insertMany(data)
  .then(document => {
    document.forEach(meal => {
      console.log(meal.title);
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  }); */

// Iteration 4
/* Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(document => {
    console.log("Success!");
  })
  .catch(err => {
    console.log("ERROR ", err);
  }); */

// Iteration 5
/* Recipe.deleteOne({ title: "Carrot Cake" })
  .then(document => {
    console.log("Success!");
  })
  .catch(err => {
    console.log("ERROR ", err);
  }); */

// Iteration 6
mongoose.disconnect();
