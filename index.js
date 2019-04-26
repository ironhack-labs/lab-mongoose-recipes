const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

Recipe.create({
  title: "Causa de Pollo",
  level: "Easy Peasy",
  ingredients: ["Yellow Potatoes", "Yellow-Pepper", "Mayonnaise", "Shredded Chicken"],
  cuisine: "Peruvian Cuisine",
  dishType: "Dish",
  image: "http://acomer.pe/wp-content/uploads/2018/02/causalimeniathumb-1.jpg",
  duration: 1,
  creator: "Anghy Pomar"
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("title:"+ Recipe.title);
    }
  }
);





Recipe.insertMany(data,
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("title:"+ Recipe.title);
    }
  }
  );


  Recipe.findByIdAndUpdate("5cc322bb7d65024a5aa06522", {duration: 100})
        .then(
          function(err) {
            if (err) {
              console.log("The Error is:", err);
            } else {
              console.log("success!");
            }
          }
        );

          Recipe.findByIdAndDelete("5cc322bb7d65024a5aa06521")
            .then(
              function(err) {
                if (err) {
                  console.log("The Error is:", err);
                } else {
                  console.log("success!");
                }
              }
            );

mongoose.disconnect();
