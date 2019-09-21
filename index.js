const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to recipes database!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create(data[0]);
data.shift();
Recipe.insertMany(data)
  .then(anterior => console.log(anterior))
  .catch(err => console.log(err));
Recipe.find({ title: "Rigatoni alla Genovese" })
  .then(receta => console.log(receta))
  .catch(err => console.log(err, "Couldn't find the Rigatonioni"));
