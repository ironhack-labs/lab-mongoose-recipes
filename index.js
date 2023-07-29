const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log("Todo borrado");
    Recipe.insertMany(data)
      .then((insertedRecipes) => {
        console.log(`${insertedRecipes.length} recetas insertadas.`);
        return insertedRecipes.forEach(x => console.log(x.title)); // Array con los documentos insertados
      })
        .then(() => {
          return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
        })
          .then(() => console.log("Actualizado con exito"))
            .then(() => {
              return Recipe.deleteOne({title: "Carrot Cake"})
            })
              .then(() => console.log("Carrot Cake eliminada"))
      .catch((error) => {
        console.error("Error creando recetas:", error);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
