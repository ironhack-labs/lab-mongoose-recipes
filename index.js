const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe.create({
      //mi receta
      title: "Thai curry Chicken",
      level: "Easy Peasy",
      ingredients: [
        "garlic",
        "ginger",
        "curryPaste",
        "cocoMilk",
        "basmatiRice",
        "chicken",
      ],
      cuisine: "Thai",
      dishType: "main_course",
      image:
        "https://www.jocooks.com/wp-content/uploads/2016/06/thai-red-chicken-curry-1-8.jpg",
      duration: 25,
      creator: "Hiba Berber",
    })
      .then((myRecipe) => console.log("he creado mi receta:", myRecipe.title))
      .then(() => {
        return Recipe.insertMany(data); //añadir el array de recetas desde Json
      })
      .then(() => {
        //actualizar la receta de Rigatoni
        return Recipe.updateOne(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        );
      })
      .then(() => {
        console.log("la receta fue actualizada con éxito");
        return Recipe.deleteOne({ title: "Carrot Cake" }); //borrar la receta de carrot cake
      })
      .then(() => {
        console.log("la receta fue eliminada con éxito");
        mongoose.connection.close(); // cerrar la conexión de mongoose
      })
      .catch((err) => console.log("oops, algo va mal", err));
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
