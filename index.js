// const express = require("express");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
// const app = express();
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .then(
    Recipe.create({
      title: "Asian Glazed Chicken Thighs",
      level: "Amateur Chef",
      ingredients: [
        "1/2 cup rice vinegar",
        "5 tablespoons honey",
        "1/3 cup soy sauce (such as Silver Swan®)",
        "1/4 cup Asian (toasted) sesame oil",
        "3 tablespoons Asian chili garlic sauce",
        "3 tablespoons minced garlic",
        "salt to taste",
        "8 skinless, boneless chicken thighs"
      ],
      cuisine: "Asian",
      dishType: "Dish",
      image:
        "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
      duration: 40,
      creator: "Chef LePapu"
    })
      .then(createdRecipe => {
        console.log(createdRecipe.title);
      })
      .then(
        Recipe.insertMany(data)
          .then(createdRecipes => {
            createdRecipes.forEach(recipe => {
              console.log(recipe.title);
              return recipe;
            });
          })
          .then(
            Recipe.findOneAndDelete(
              { name: "Rigatoni alla Genovese" },
              {
                duration: 100
              }
            )
              .then(updatedRecipe => {
                updated: true;
              })
              .then(
                Recipe.deleteOne({ name: "Carrot Cake" }).then(
                  deletedRecipe => {
                    deleted: true;
                    mongoose.connection.close();
                  }
                )
              )
          )
      )
  )

  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// app.get("/new-recipe", (req, res) => {
//   Recipe.create({
//     title: "Asian Glazed Chicken Thighs",
//     level: "Amateur Chef",
//     ingredients: [
//       "1/2 cup rice vinegar",
//       "5 tablespoons honey",
//       "1/3 cup soy sauce (such as Silver Swan®)",
//       "1/4 cup Asian (toasted) sesame oil",
//       "3 tablespoons Asian chili garlic sauce",
//       "3 tablespoons minced garlic",
//       "salt to taste",
//       "8 skinless, boneless chicken thighs"
//     ],
//     cuisine: "Asian",
//     dishType: "Dish",
//     image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
//     duration: 40,
//     creator: "Chef LePapu"
//   })
//   .then(createdRecipe => {
//     console.log(createdRecipe.title)
//     res.json(createdRecipe)
//   })
// });

// app.get("/new-recipes", (req, res) => {
//   Recipe.insertMany(data)
//   .then(createdRecipes => {
//     createdRecipes.forEach(recipe => {
//       console.log(recipe.title);
//       return recipe;
//     })

//     res.json(createdRecipes);
//   })
// });

// app.get("/recipe/update/:id", (req, res) => {
//   Recipe.findByIdAndUpdate(req.params.id, {
//     duration: 100
//   }).then(updatedRecipe => res.json({ updated: true }));
// });

// app.get("/recipe/delete/:id", (req, res) => {
//   Recipe.deleteOne({ _id: req.params.id })
//   .then(deletedRecipe => res.json({ deleted: true }));
// });

// app.listen(3000, () => {
//   console.log("Server started")
// });
