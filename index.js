const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { db } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(newRecipe)
      .then(dbSuccess => {
        console.log(dbSuccess);
      })
      .catch(dbErr => {
        console.log(dbErr);
      });

    Recipe.findByIdAndUpdate(
      "5e970c938ea1b995a5501780",
      {
        duration: 100
      },
      { new: true }
    )
      .then(dbSuccess => {
        console.log("Bravo mission accomplished");
      })
      .catch(dbErr => {
        console.log(dbErr);
      });

    Recipe.insertMany(data)
      .then(dbSuccess => {
        dbSuccess.forEach(e => {
          console.log(e.title);
        });
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(dbSuccess => {
            console.log("Carrot has been deleted succesfully");
            mongoose.connection
              .close()
              .then(dbSuccess => {
                console.log("mongoose closed");
              })
              .catch(dbErr => {
                console.log(dbErr);
              });
          })
          .catch(dbErr => {
            console.log(dbErr);
          });
      })
      .catch(dbErr => {
        console.log(dbErr);
      });
  })
  .catch(error => {
    console.error("Error connecting to the database", error);
  });

const newRecipe = {
  title: "Pizza",
  level: "Easy Peasy",
  Ingredients: ["Tomate", "olives", "Farine"],
  cuisine: "italia",
  dishType: "other",
  duration: 30,
  creator: "Mario Bros"
};
