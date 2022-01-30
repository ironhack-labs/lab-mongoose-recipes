const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
      Recipe.insertMany(data, { ordered: false })
      .then((insertedRecipies) => {
        for (let i = 0; i < insertedRecipies.length; i++) {
          console.log("those are the new recipes:" + insertedRecipies[i].title);
        }
      })
      //ITERATION 4 - waiting for all recipies to be added before updating one
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
        .then(() => {
          console.log("Rigatoni has been updated");
        })
      })
      
      //ITERATION 5 - waiting for all recipies to be added/updated before deleting one
      .then(() => {
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(() => {
            console.log("carrot cake has been deleted");
            //ITERATION 6
          })
          .then(() => {
            mongoose.connection.close();
            console.log(`connection closed`);
          })
      });
  }) //CLOSING .THEN AFTER DATABASE HAS CONNECTED

  //CATCH FOR DATABASE CONNECTION FAILURE

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
