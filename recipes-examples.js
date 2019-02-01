const mongoose = require("mongoose");

const data = require("./data.js");
const Recipe = require("./recipes.js");

// connect to the database defined by this CONNECTION STRING
// (domain, port, database name, password and all info about the database server)
mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

data.forEach(oneTitle => {
  Recipe.create(oneTitle)
    .then(recipeResult => {
      if (oneTitle.title === "Carrot Cake") {
        Recipe.deleteMany({
          title: { $eq: "Carrot Cake" }
        })
          .then(recipeSelected => {
            console.log(`Carrot Cake deleted SUCCESS`, recipeSelected);
          })
          .catch(err => {
            console.log("Carrot Cake deleted FAIL", err);
          });
      } else {
        console.log(`The title of the recipe is ${recipeResult.title}`);
      }
    })
    .catch(err => {
      console.log("Recipe failure", err);
    });
});

Recipe.updateMany(
  { title: { $eq: "Rigatoni alla Genovese" } },
  { $set: { duration: 100 } }
)
  .then(recipeSelected => {
    console.log(`Duration updated SUCCESS ${recipeSelected.duration}`);

    Recipe.findOne({ title: { $eq: "Rigatoni alla Genovese" } })
      .then(recipeSelected => {
        console.log(
          `Recipe.findOne() --- ${recipeSelected.title} (duration: ${
            recipeSelected.duration
          })`
        );
      })
      .catch(err => {
        console.log("Recipe.findOne() FAILURE", err);
      });
  })
  .catch(err => {
    console.log("Duration update FAIL", err);
  });
