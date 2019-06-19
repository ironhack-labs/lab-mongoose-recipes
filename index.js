const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

mongoose.set("useCreateIndex", true);
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

function createRecipe() {
  Recipe.create({
    title: "lasagna",
    level: "Easy Peasy",
    ingredients: ["pasta", "tomatoes", "mozza"],
    cuisine: "italian",
    dishType: "Dish",
    image: "",
    duration: "20",
    creator: "Someone",
    created: "1999"
  })
    .then(res => {
      console.log(res.title);
    })
    .catch(err => {
      console.log("Error !");
    });
}

// createRecipe();

Recipe.insertMany(data)
  .then(res => {
    for (i = 0; i < data.length; i++) {
      console.log(data[i].title);
    }
  })
  .catch(err => console.log(err));

Recipe.updateOne({ duration: 220 }, { duration: 100 })
  .then(res => {
    console.log("yay");
  })
  .catch(err => {
    console.log("Oh no");
  });

Recipe.findByIdAndRemove("5d0a54fd161a961cf0b04ae4")
  .then(res => {
    console.log("yay");
  })
  .catch(err => {
    console.log("Oh no");
  });

mongoose.disconnect();
