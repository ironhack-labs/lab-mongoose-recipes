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

const carbonara = {
  title: "Carbonara",
  level: "UltraPro Chef",
  ingredients: [
    "200gr spaghetti",
    "100gr guanciale",
    "2 eggs",
    "150 gr pecorino romano",
    " black pepper"
  ],
  cuisine: "Italian",
  dishType: "Dish",
  image: "https://wips.plug.it/cips/buonissimo.org/cms/2019/02/carbonara.jpg",
  duration: 20,
  creator: "Chef Davide"
};

Recipe.create(carbonara)
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.insertMany(data)
  .then(recipe => {
    console.log(recipe.title);
  })
  .catch(err => {
    console.log(err);
  });

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => {
    console.log(recipe.title + " Updated");
  })
  .catch(err => {
    console.log(err);
  });

Recipe.findOneAndDelete({ title: "Carrot Cake" })
  .then(recipe => {
    console.log(recipe.title + " Deleted");
  })
  .catch(err => {
    console.log(err);
  });

mongoose.connection.close();
