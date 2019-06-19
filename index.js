const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'
//console.log(data);

mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.remove({ _title: "Carrot Cake" }, function(err) {
  if (!err) {
    console.log("added!");
  } else {
    console.log("nopety nope");
  }
});

Recipe.insertMany(data)
  .then(result => {
    console.log("yay got data!");

    let conditions = { title: "Rigatoni alla Genovese" };
    let update = { duration: 100 };

    Recipe.updateOne(conditions, update)
      .then(res => {
        console.log("changed match at " + res.n);
      })
      .catch(err => console.log("erreur"));
  })
  .catch(err => console.log("nay aint go shit", err));

function createRecipe() {
  Recipe.create({
    title: "Moussaka",
    level: "Easy Peasy",
    ingredients: ["Eggplant", "Onions", "Tomatoes"],
    cuisine: "grecque",
    dishType: "Dish",
    image:
      "https://static.cuisineaz.com/610x610/i131168-moussaka-au-thermomix.jpeg",
    duration: 2,
    creator: "ma grand-mère",
    created: "1967-12-09"
  });
}

createRecipe();
