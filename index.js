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

// const recipe = Recipe.create({
//   title: "Asian Glazed Chicken Thighs",
//   level: "Amateur Chef",
//   ingredients: [
//     "1/2 cup rice vinegar",
//     "5 tablespoons honey",
//     "1/3 cup soy sauce (such as Silver Swan®)",
//     "1/4 cup Asian (toasted) sesame oil",
//     "3 tablespoons Asian chili garlic sauce",
//     "3 tablespoons minced garlic",
//     "salt to taste",
//     "8 skinless, boneless chicken thighs"
//   ],
//   cuisine: "Asian",
//   dishType: "Dish",
//   image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//   duration: 40,
//   creator: "Chef LePapu"
// }).then(createdRecipe => {
//   console.log("Recipe name: " + createdRecipe.title);
// });

const recipes = Recipe.insertMany(data)
  .then(createdRecipes => {
    createdRecipes.forEach(recipe => console.log(recipe.title));

    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(result => {
        console.log("Successsfully updated Rigatoni alla Genovese!");
      })
      .catch(err => {
        console.log(err);
      });

    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(result => {
        console.log("Successsfully deleted Carrot Cake!");

        mongoose.connection
          .close()
          .then(result => {
            console.log("Connection to the database was closed.");
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
