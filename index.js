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

// Create a Recipe
Recipe.create({
  title: "Chocolate Chip Cookies",
  level: "Easy Peasy",
  ingredients: [
    "Flour",
    "Baking Soda",
    "Brown Sugar",
    "Chocolate Chips",
    "Salt",
    "Vanilla",
    "White Sugar"
  ],
  cuisine: "American",
  dishType: "Dessert",
  image:
    "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/62298.jpg",
  creator: "Buzzfeed",
  created: 31 / 12 / 2020
})
  .then(createdRecipe => {
    console.log(createdRecipe);
  })
  .catch(err => {
    console.log(err);
  });

// Add multiple recipes
  Recipe.insertMany(data)
  .then(recipes => {
    console.log(recipes);

    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, {duration: 100}).then(info => {
      console.log(info);
      Recipe.deleteOne({ title: "Carrot Cake" }).then(info => {
        console.log("Deleted: ", info);
      });
    }).catch(err => {
      console.log(err);
    });

  })
  .catch(err => {
    console.log(err);
  });

  mongoose.connection.close();



