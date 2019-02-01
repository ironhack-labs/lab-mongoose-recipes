const mongoose = require("mongoose");

const Recipe = require("./recipes.js");
const data = require("./data.js");

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
    .then(recipe => {
      if (oneTitle.title === "Carrot Cake") {
        Recipe.deleteMany({ title: { $eq: "Carrot Cake" } })
          .then(result => {
            console.log("Recipe.deleteMany() SUCCESS!", result);
          })
          .catch(err => {
            console.log("Recipe.deleteMany() FAILURE!", err);
          });
      }
      console.log("CREATION success!", recipe);
    })
    .catch(err => {
      console.log("CREATION failure!", err);
    });
});

Recipe.create({ title: "Dombre", cuisine: "Caribbean" })
  .then(recipe => {
    console.log("Dombré CREATE success!", recipe);
  })
  .catch(err => {
    console.log("Dombré CREATE failure!", err);
  });

Recipe.findByIdAndUpdate("5c544ab4d7e0191331a68e58", {
  $set: { duration: 100 }
})
  .then(recipe => {
    console.log(`recipe $set WORKED ${recipe._id}`);
  })
  .catch(err => {
    console.log("Recipe $set FAILURE!!", err);
  });
