const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const data = require("./data.js");

mongoose
  .connect("mongodb://localhost/recipeApp")
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create(
  {
    title: "salmorejo",
    level: "Easy Peasy",
    ingredients: ["tomate", "ajo", "pan", "aceite", "vinagre", "sal"],
    cousine: "spanish",
    dishType: "Dish",
    image: String,
    duration: 15,
    creator: "Paco",
    created: "2018-04-12"
  },
  function(err, recipe) {
    if (err) console.log("An error happened:", err);
    else {
      console.log("The recipe is saved and its value is: ", recipe);
      Recipe.insertMany(data, (err, res) => {
        if (err) {
          console.log("Insert Error", err);
        } else {
          console.log("Successful Insert", res);
          for (i = 0; i < data.length; i++) {
            console.log(data[i].title);
          }
          Recipe.updateOne(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 },
            (err, res) => {
              if (err) {
                console.log("Error Update", err);
              } else {
                console.log("Updated!", res);
                Recipe.deleteMany({ title: "Carrot Cake" }, (err, res) => {
                  if (err) {
                    console.log("Error Deleting", err);
                  } else {
                    console.log("Deleted!", res);
                    mongoose.connection.close();
                  }
                });
              }
            }
          );
        }
      });
    }
  }
);
