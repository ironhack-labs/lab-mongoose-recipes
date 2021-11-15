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
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const addRecipie = {
      title: "Recipie for Disaster",
    };
    // return Recipe.create(addRecipie);
    // Run your code here, after you have insured that the connection was made
  })
  .then((addNewRecipie) => {
    // console.log("addNewRecipie :>> ", addNewRecipie);

    return Recipe.insertMany(data);
  })
  .then((allRecipies) => {
    // console.log("allRecipies :>> ", allRecipies);

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updateRecipe) => {
    // console.log("updateRecipe :>> ", updateRecipe);

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((result) => {
    console.log(`deleteRecipe :>> `, result);
    mongoose.connection.close();
  })
  .then(() => {
    console.log("connection closed!");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
