const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const newRecipe = {
  title: "Cabage soup",
  level: "Amateur Chef",
  ingredients: ["cabage", "soup"],
  cuisine: "Chinese",
  dishType: "soup",
  durection: 15,
  creator: "Axel",
};

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
    // =====Iteration 2 =====
    Recipe.create(newRecipe)
      .then((dbRes) => {
        console.log("Adding custom recipe ===>" + newRecipe.title);
        // =====Iteration 3 =====
        Recipe.insertMany(data)
        .then((dbRes) => {
          dbRes.forEach((recipe) => console.log("Adding existing recipes ===>" + recipe.title));
          // =====Iteration 4 =====
          Recipe.updateOne(
            { title: "Rigatoni alla Genovese" },
            { duration: 100 }
          ).then(() => {
            // =====Iteration 5 =====
            Recipe.deleteOne({ title: "Carrot Cake" })
            .then((dbRes) => {
              console.log("Carrot cake recipe was removed");
              // =====Iteration 6 =====
              mongoose.connection.close();
            });
          });
        });
      })
      .catch((dbRes) => {
        console.log("Error removing Carrot Cake recipe");
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
