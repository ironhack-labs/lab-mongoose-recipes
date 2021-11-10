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
  .then(() => Recipe.syncIndexes())
  .then(() => Recipe.create(data))
  .then((theNewRecipe) => console.log("Se han creado estas recetas:", theNewRecipe))
  .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }))
  .then((details) => console.log("Los detalles de la modificación son:", details))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
  .then((removedRecipe) => console.log("La receta eliminada es:", removedRecipe))
  .then(() => Recipe.close())
  .catch((error) => console.error("Error connecting to the database", error));
