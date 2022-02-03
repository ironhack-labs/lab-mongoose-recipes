const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    // Recipe.create(data[0]).then(result => console.log(result))
    return Recipe.insertMany(data).then((result) =>
      result.forEach((result, index) => console.log(index, ":", result.title))
    );
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    ).then((result) =>
      console.log(result.title, "has a new duration:", result.duration)
    );
  })
  .then(() => {
    Recipe.findOneAndDelete({ title: "Carrot Cake" }).then((result) => {
      console.log("Deleted Carrot Cake from database");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
