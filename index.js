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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log('La base de datos está vacía');
    return Recipe.create({ title: "Las Recetas de Juli y Gaby" })
  })  
  .then((theRecipe) => {
    console.log("El titulo de la receta es:", theRecipe.title);
    return Recipe.create(data)
  })
  .then((allTheRecipes) => {
    console.log("Esto es:", allTheRecipes);
  });
  