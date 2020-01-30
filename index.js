const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch(err => console.error("Error connecting to mongo", err));
function db() {
  Recipe.create({
    title: "Pizza",
    level: "Easy Peasy",
    ingredients: ["flour", "yeast", "tomato sauce", "cheese"],
    cuisine: "Italian",
    dishType: "Dish",
    image: "https://images.media-allrecipes.com/images/75131.jpg",
    duration: 30
  })
    .then(createdRecipe => console.log(createdRecipe))
    .catch(err => console.log(err));

  Recipe.insertMany(data);
}

Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(() => {
    console.log("Updated!");
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({ title: "Carrot Cake" })
  .then(() => {
    console.log("Deleted!");
  })
  .catch(err => {
    console.log(err);
  });

setTimeout(() => {
  console.log("Closing the connection");
  mongoose.connection.close();
}, 5000);
