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
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipesCreated) => {
    console.log(recipesCreated);
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipeFound) => {
    console.log(recipeFound);
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    const pr = mongoose.connection.close();
    return pr;
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
