const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
console.log(data);

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const dataFirst = data[0];

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //create new recipe document to db
    // Commented out so no duplicates will be created
    // Recipe.create(dataFirst)
    //   .then((recipe) =>
    //     console.log("The recipe is saved and its value is: ", recipe)
    //   )
    //   .catch((error) =>
    //     console.log("An error happened while saving a new user:", error)
    //   );
    return Recipe.insertMany(data);
  })
  .then((allRecipies) => {
    console.log(">>>>>>>>>>data" + allRecipies);
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    ).then((value) => console.log("value rewritten" + value));
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Rigatoni alla Genovese" }).then(() =>
      console.log("deleted")
    );
  })
  .then(() => {
    //remember to close connection
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
