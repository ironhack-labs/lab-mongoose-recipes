const mongoose = require("mongoose");

/** handling Deprecation Warnings **/
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
/****/

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

// set address
const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Philly Cheese Steak Sandwich",
      cuisine: "Shortens lifespan reliably",
      creator: "Will Smith",
    })
      .then((recipe) => console.log("Created: ", recipe.title))
      /*** end create ***/
      .then(() => {
        Recipe.insertMany(data)
          .then(() => {
            data.forEach((recipe) => {
              console.log(`Added: ${recipe.title}`);
            });
            /*** end insertMany ***/
            Recipe.findOneAndUpdate(
              { title: "Rigatoni alla Genovese" },
              { duration: 100 }
            )
              .then(() => {
                console.log("Updated: duration on 'Rigatoni alla Genovese'.");
              })
              .then(() => {
                /*** end findOneAndUpdate ***/
                Recipe.deleteOne({ title: "Carrot Cake" })
                  .then(() => {
                    console.log("Removed: Carrot Cake.");
                  })
                  /*** end deleteOne ***/
                  .then(() => {
                    mongoose.connection.close(() => {
                      console.log("Disconnected.");
                    });
                  })
                  /*** end connection.close ***/
                  /**/
                  /** closing then()'s, catching errors **/
                  .catch((error) => {
                    console.log("Error while deleting: ", error);
                  });
              })
              .catch((error) => {
                console.log("Error while updating: ", error);
              });
          })
          .catch((error) => {
            console.log("Error while inserting: ", error);
          });
      })
      .catch((error) => {
        console.log("Error while creating: ", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database.", error);
  });
