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
  .then(async () => {
    // Run your code here, after you have insured that the connection was made

    //Insert One Recipe
    try {
      const cookies = {
        title: "Cookies",
        level: "Easy Peasy",
        ingredients: [
          "Farine",
          "Eggs",
          "Sugar",
          "Levure Chimique",
          "Chunks Chocolate",
          "Honey",
        ],
        cuisine: "American",
        dishType: "dessert",
        duration: 20,
        creator: "My mother",
      };
      const result = await Recipe.create(cookies);
    } catch (err) {
      console.err(err);
    }

    //Insert Many Recipe
    try {
      const result = await Recipe.insertMany(data);
      console.log(result);
    } catch (err) {
      console.err(err);
    }

    //Update a recipe
    try {
      const result = await Recipe.updateOne(
        {
          title: "Rigatoni alla Genovese",
        },
        { duration: 100 }
      );
    } catch (err) {
      console.err(err);
    }
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
