const PORT = 3000;
require("./configs/db.config");
const mongoose = require("mongoose");
const Recipe = require("./models/recipe.model");
const express = require("express");
const app = express();
const recipes = require("./data/recipes.data");

//ITERATION 
Recipe.create({
  title: "Lasagna",
  level: "Easy Peasy",
  ingredients: ["carne", "pollo"],
  cousine: "Española",
  dishType: ["Dish"],
  duration: 100,
  creator: "Fran"
})
  .then(recipe => {
    console.log(recipe);
  })
  .catch(err => {
    console.log(err);
  });

//UPDATE RECIPE 
Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
  .then(recipe => {
    console.log(`${recipe.title} has been updated`);
  })
  .catch(err => {
    console.log(err);
  });

//ITERATION 4 FROM DATA/SEEDS OR ALTOGETHERE HERE BELOW

//DELETE RECIPE
Recipe.remove({ title: "Chocolate Chip Cookies" })
  .then(recipe => {
    console.log(`RECIPE DELETED`);
  })
  .catch(err => {
    console.log(err);
  });

// ITERATION 4 : ASI SI QUIERO MOSTRAR QUE RECETA ESTA BIEN ???
Recipe.findOne({ title: "Chocolate Chip Cookies" })
  .then(recipe => {
    console.log(`recipe ${recipe.title} has been deleted`);
    return Recipe.deleteOne({ title: recipe.title });
  })
  .then(deletedItem => {
    console.log(deletedItem);
  })
  .catch(err => {
    console.log(err);
  });

// Recipe.findOne({ title: "Chocolate Chip Cookies" })
//   .then(recipe => {
//     console.log("found " + recipe.title);
//     return recipe;
//   })
//   .then(recipe => {
//     return Recipe.remove({ title: recipe.title });
//   })
//   .then(deleted => {
//     console.log(`${deleted.title} has been deleted`);
//     console.log(deleted);
//   })

//   .catch(err => {
//     console.log(err);
//   });

// User.findOne({ email: "pepe@gmail.com" })
//   .then(user => {
//     if (user) {
//       user.name = "Juan";
//       return user.save();
//     }
//   })
//   .then(() => {
//     console.info("User saved!");
//     return User.deleteOne({ email: "pepe@gmail.com" });
//   })
//   .then(() => {
//     console.info("User deleted!");
//   })
//   .catch(error => {
//     console.error(error);
//   });

//ITERATION 1-6 ALTOGETHER
Recipe.insertMany(recipes)
  .then(recipes => {
    console.log(`${recipes.length} inserted`);

    Recipe.findOne({ title: "Rigatoni alla Genovese" })
      .then(element => {
        if (element) {
          element.duration = 300;
          element.save();
          console.log(`${element.title} duration is now ${element.duration}`);
        } else {
          console.log("we coundt find the recipe");
        }

        Recipe.findOneAndRemove({ title: "Carrot Cake" })
          .then(element => {
            console.log("recipe deleted", element);

            mongoose.connection
              .close()
              .then(() => {
                console.log("connection closed");
              })
              .catch(err => {
                console.log("error closing connection", err);
              });
          })
          .catch(err => {
            console.log("no recipe found to be deleted ", err);
          });
      })
      .catch("we coundnt update the duration");
  })
  .catch(err => {
    console.log("we coudnt insert to the");
  });

app.listen(PORT, () => {
  console.log("running on port " + PORT);
});
