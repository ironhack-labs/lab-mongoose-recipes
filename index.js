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

Recipe.insertMany(data)
  .then(recipe => {
    Recipe.forEach(element => {
      console.log(`Recipe title is: ", ${element.title}`);
    });
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.create({
  title: "Test",
  level: "Easy Peasy",
  ingredients: ["tomate", "courgette"],
  cuisine: "italien",
  dishType: "Dish",
  image: "https://images.media-allrecipes.com/images/75131.jpg",
  duration: 20,
  creator: "Jo"
})
  .then(recipe => {
    console.log(`Recipe title is: ", ${recipe.title}`);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.update({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } })
  .then(recipe => {
    console.log(`Modification done: ${recipe.duration}`);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(recipe => {
    console.log(`Suppression done: ${recipe.title}`);
  })
  .catch(err => {
    console.log("An error happened:", err);
  });

mongoose.connection.close();
