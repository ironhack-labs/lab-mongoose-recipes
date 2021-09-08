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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then((response) =>
    Recipe.insertMany(data)
      .then((result) => console.log(`Added ${data.length} rows`))
      .catch((error) => {
        console.error(error);
      })
  )
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

function showTitle() {
  Recipe.find()
    .then((result) => result.forEach((title) => console.log(title.title)))
    .catch((error) => console.error(error));
}
showTitle();

function updateOneRegister(filter, params) {
  Recipe.updateMany({title: `${filter}`}, {duration: `${params}`})
    .then((result) => console.log("Update successful"))
    .catch((error) => console.error(error));
}

updateOneRegister("Rigatoni alla Genovese",100)
