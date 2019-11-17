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
    Recipe.deleteMany({})
      .then(console.log("SUCCESS: database has been cleared"))
      .catch(console.log("ERROR: database could not be cleared"));
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
        console.log("SUCCESS: created the recipe", document.title);
      })
      .catch(error => {
        console.log("ERROR: There was an error creating the recipe: ", 
        // error
        );
      });
    // Insert many recipes from data:
    Recipe.insertMany(data)
      .then(document => {
        console.log("SUCCESS: inserted the receipe array from data.js");
      })
      .then(document => {
        for (i = 0; i < data.length; i++) {
          console.log(data[i].title);
        }
      })
      .catch(error => {
        console.log(
          "ERROR: There was an error inserting the receipe array from data.js: ",
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
          "ERROR: There was an error updating Rigatoni alla Genovese: ",
          error
        );
      });
    // deleteOne recipe:
    Recipe.deleteOne({ title: "Carrot Cake" })
      .then(document => {
        console.log("SUCCESS: removed: ", document.title);
      })
      .catch(error => {
        console.log(
          "ERROR: There was an error removing: Carrot Cake",
          error
        );
      });
    // // print all documents in the collection:
    // Recipe.find({})
    //   .then(document => {
    //     console.log(document.title);
    //   })
    //   .catch(error => {
    //     console.log("ERROR listing all documents: ", error)
    //   });
  })
  .catch(err => {
    console.error("ERROR: Error connecting to mongo", err);
  });

// mongoose.connection.close()
