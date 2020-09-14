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
    // ------------- Create a recipe -------------
    try {
      const eggSandwich = {
        title: "Egg Sandwich",
        level: "Easy Peasy",
        ingredients: ["2 slices of Bread", "1 egg", "1 slice of ham", "mayonnaise"],
        cuisine: "Brazillian",
        dishType: "snack",
        duration: 10,
        creator: "My mother",
      };

      const result = await Recipe.create(eggSandwich);
    } catch (err) {
      console.error(err);
    }

    // ------------- Create many recipes -------------
    try {
      const result = await Recipe.insertMany(data);

      console.log(result);
    } catch (err) {
      console.error(err);
    }

    // ------------- Update a recipe -------------
    try {
      const result = await Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { $set: { duration: 100 } });

      console.log(result);
    } catch (err) {
      console.error(err);
    }

    // ------------- Delete a recipe -------------
    try {
      const result = await Recipe.deleteOne({ title: "Carrot Cake" });

      console.log(result);
    } catch (err) {
      console.error(err);
    }

    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
