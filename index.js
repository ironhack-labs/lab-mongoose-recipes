const mongoose = require("mongoose");
const Recipe = require("./models/Recipe"); // Import of the model Recipe from './models/Recipe'
const data = require("./data.js"); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipeApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to Mongo!");
    // Create 1 recipe(hardcode):
    Recipe.create({
      title: "Pie14",
      level: "Easy Peasy",
      ingredients: ["a", "b", "c"],
      cuisine: "German",
      dishType: "Dessert",
      duration: 2,
      creator: "me"
    })
      .then(document => {
        console.log("We successfully created the recipe", document.title);
      })
      .catch(error => {
        console.log("There was an error creating the recipe: ", 
        // error
        );
      });
    // Insert many recipes from data:
    Recipe.insertMany(data)
      .then(document => {
        console.log("Successfully inserted the receipe array from data.js");
      })
      .then(document => {
        for (i = 0; i < data.length; i++) {
          console.log(data[i].title);
        }
      })
      .catch(error => {
        console.log(
          "There was an error inserting the receipe array from data.js: ",
          // error
        );
      });
    // updateOne receipe:
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(document => {
        console.log("SUCCESS: updated: ", document.title);
      })
      .catch(error => {
        console.log(
          "There was an error updating Rigatoni alla Genovese: ",
          error
        );
      });
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(document => {
        console.log("SUCCESS: removed: ", document.title);
      })
      .catch(error => {
        console.log(
          "There was an error removing: Carrot Cake",
          error
        );
      });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// mongoose.connection.close()
  