const mongoose = require("mongoose");

const log = console.log;
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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    return Recipe.create({
      title: "Beans",
      cuisine: "Portuguese",
      dishType: "breakfast",
      level: "Amateur Chef",
    });
  })
  .then((recipe) => {
    console.log(recipe);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updated) => {
    console.log("updated:", updated);
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then((deletedRecipe) => {
    console.log("Success - removed carrot", deletedRecipe);
    return mongoose.disconnect();
  })
  .then(() => {
    log("disconnected");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
