const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./recipe-model.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Beer Marinated Hedgehog",
  level: "UltraPro Chef",
  ingredients: [
    "1 six pack of beer",
    "1 baby hedhehog",
    "3 tablespoons of red chili",
    "Salt and pepper"
  ],
  cuisine: "Gipsy",
  dishType: ["Dish"],
  image:
    "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwi6sofEzprgAhVvBWMBHb1BB_AQjRx6BAgBEAU&url=%2Furl%3Fsa%3Di%26source%3Dimages%26cd%3D%26ved%3D%26url%3Dhttp%253A%252F%252Fbrugor06.blogspot.com%252F2014%252F04%252F%26psig%3DAOvVaw0U1NYkY_V5UG6HniQ_9WhY%26ust%3D1549113186386914&psig=AOvVaw0U1NYkY_V5UG6HniQ_9WhY&ust=1549113186386914",
  duration: 1440,
  creator: "Chef Gipsy"
})
  .then(recipeDoc => {
    console.log("New recipe CREATED correctly ! Yummmm.", recipeDoc);
  })
  .catch(err => {
    console.log("Recipe's creation failed...", err);
  });

Recipe.insertMany(data)
  .then(recipeDoc => {
    recipeDoc.forEach(event => {
      console.log(`New Recipes ADDED to you Database: ${event.title}`);
    });
  })
  .catch(err => {
    console.log("Oops... DATA.js failed to import", err);
  });

Recipe.findByIdAndUpdate("5c5456fe6fa26615ee7e5ac1", {
  $set: { duration: 100 }
})
  .then(result => {
    console.log("Rigatoni alla Genovese UPDATED. New duration is set to 100");
  })
  .catch(err => {
    console.log("Failed to update the recipe....", err);
  });

Recipe.findByIdAndRemove("5c5456fe6fa26615ee7e5ac0")
  .then(recipeDoc => {
    if (recipeDoc) {
      console.log(`The recipe: ${recipeDoc.title} was deleted correctly`);
    } else {
      console.log("Couldn't find the desired recipe");
    }
  })
  .catch(err => {
    console.log("An error has occured while trying to remove...");
  });

mongoose
  .disconnect()
  .then(result => {
    console.log("DISCONECTED CORRECTLY");
  })
  .catch(err => {
    console.log("An ERROR has occured, connection still up...");
  });
