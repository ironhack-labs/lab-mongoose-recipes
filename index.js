/*jshint esversion: 6 */

const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

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
    return Recipe.create({
      title: "Godly Pancakes",
      level: "God",
      ingredients: [
        "1 1/2 cups all-purpose flour",
        "1 1/4 cups milk",
        "3 1/2 teaspoons baking powde",
        "1 egg",
        "1 teaspoon salt",
        "3 tablespoons butter, melted",
        "1 tablespoon white sugar",
        "Godly touch",
      ],
      cuisine: "The heavens",
      dishType: "Desert",
      image:
        "https://www.kingarthurflour.com/sites/default/files/recipe_legacy/48-3-large.jpg",
      duration: 20,
      creator: "God",
      created: Date.now(),
    });
  })
  .then(() => {
    return Recipe.create([...data]);
  })
  .then((recipe) => {
    console.log("the recepies has been insterted.", recipe);
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true },
      (err) => {
        if (err) {
          console.log("Something wrong when updating data!");
        }
      }
    );
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" }, (err) => {
      if (err) {
        console.log("The Carrot Cake was not deleted.");
      }
      console.log("The Carrot Cake was deleted.");
      console.log("Shutting down connection to DB!");
      mongoose.connection.close();
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
