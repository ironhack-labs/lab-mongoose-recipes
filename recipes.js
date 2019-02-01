const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./models/recipe-model.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Tiramisu",
  level: "Easy Peasy",
  ingredients: ["sugar", "savoiardi", "coffee", "eggs", "mascarpone"],
  cuisine: "italian",
  dishType: "Dessert",
  image:
    "https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwi61OuS1prgAhUIoRQKHfjdAP0QjRx6BAgBEAU&url=https%3A%2F%2Fwww.cuisineaz.com%2Frecettes%2Ftiramisu-simple-55519.aspx&psig=AOvVaw37JBrS5G15L52GepWKyNaz&ust=1549115249421296",
  duration: 30,
  creator: "Francesca",
  created: 02 - 01 - 2019
})

  .then(recipeX => {
    console.log("recipe create success!", recipeX);
  })

  .catch(err => {
    console.log("recipe create failure", err);
  });

Recipe.insertMany(data)
  .then(result => {
    result.forEach(oneResult =>
      console.log(`INSERT MANY WORKS !!!! ${oneResult.title}`)
    );
  })
  .catch(err => console.log(err));

Recipe.findByIdAndUpdate("5c545fb60dcf5f615e7883c8", {
  $set: { duration: 100 }
})
  .then(recipeX => {
    console.log(`Genovese UPDATED ${recipeX._id}`);
  })
  .catch(err => {
    console.log("Genovese UPDATE failure", err);
  });

Recipe.findByIdAndRemove("5c545fb60dcf5f615e7883c7")
  .then(recipeX => {
    if (recipeX) {
      console.log(`DELETED ${recipeX} (id: ${recipeX._id})`);
    } else {
      console.log("couldn't find anything to delete");
    }
  })
  .catch(err => {
    console.log("Recipe.findByIdAndRemove() FAILURE", err);
  });
