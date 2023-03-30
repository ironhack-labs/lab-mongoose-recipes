const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { deleteMany } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(data);
  })
  .then((res) => {
    console.log(
      res[0].title,
      res[1].title,
      res[2].title,
      res[3].title,
      res[4].title
    );
    return;
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.findOne({ title: "Carrot Cake" });
  })

  .then((res) => {
    return Recipe.deleteOne(res);
  })

  .then(() => {
    return mongoose.disconnect();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
