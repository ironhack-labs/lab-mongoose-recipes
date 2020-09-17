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

    const newRecipe = Recipe.create({
      title: "cake",
      level: "Easy Peasy",
      ingredients: ["eggs", "suggar", "milk", "pounder"],
      cuisine: "",
      dishType: "dessert",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 1,
      creator: "Chief of Cake",
      created: "04/13/1965",
    });
    console.log(newRecipe.title);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
