const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
    Recipe.create({
      title: "Awsnack",
      level: "Easy Peasy",
      ingredients: ["sugar", "salt", "milk", "magic wand"],
      cuisine: "Heavenly",
      dishType: "Snack",
      duration: 10,
      creator: "Toto"
    })
      .then(dbResult => {
        console.log(dbResult.title);
        Recipe.insertMany(data)
          .then(dbResult => {
            dbResult.forEach(element => {
              console.log(element.title);
            });

            Recipe.update(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then(dbResult => {
                console.log(dbResult);
                console.log("item updated");
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(dbResult => {
                    console.log(dbResult);
                    console.log("item deleted");
                    mongoose
                      .disconnect("mongodb://localhost/recipeApp", {
                        useNewUrlParser: true
                      })
                      .then(() => {
                        console.log("connection closed");
                      })
                      .catch(error => {
                        console.log(error);
                      });
                  })
                  .catch(dbError => {
                    console.log(dbError);
                  });
              })
              .catch(dbError => {
                console.log(dbError);
              });
          })
          .catch(dbError => {
            console.log(dbError);
          });
      })
      .catch(dbError => {
        console.log(dbError);
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
