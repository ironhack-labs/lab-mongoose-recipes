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
    const resultCreate = Recipe.create({
      title: "Pão de queijo",
      level: "Amateur Chef",
      ingredients: ["Queijo", "Farinha"],
      cuisine: "Mineira",
      dishType: "breakfast",
      duration: 30,
      creator: "Dona Maria",
    })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
