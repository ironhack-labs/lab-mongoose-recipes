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
    // Before adding any recipes to the database, let's remove all existing ones

    return Recipe.deleteMany();
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({ title: "Cheescake", cuisine: "xd" })
      .then((newRecipe) => {
        console.log(newRecipe.title);
      })
      .catch((error) => {
        console.error("no titulo xd", error);
      });
    //iteration 3

    Recipe.create(data).then((newArray) => {
      newArray.forEach((Recipe) => {
        console.log(Recipe.title);
      }).then((Recipe) => {
        Recipe.findOneAndUpdate({
          title: "Rigatoni alla Genovese",
          duration: 100
          
        });
      })
    });

  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
