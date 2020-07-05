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
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: "Tarta de Manzana",
      level: "Easy Peasy",
      ingredients: ["Leche", "Azucar", "Harina", "Huevo", "Manzanas"],
      cuisine: "General",
      dishType: "snack",
      duration: 30,
      creator: "La Abuela",
    })
      .then((resDataBase) => {
        console.log(resDataBase.title, "receta añadida");
      })
      .then(() => Recipe.insertMany(data))
      .then((dataRecipe) =>
        dataRecipe.forEach((recipes) => {
          console.log("Las recetas son:", recipes.title);
        })
      )
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 },
          { new: true }
        ).then((updateRecipe) => {
          console.log("Se ha subido con exito:", updateRecipe);
        });
      })
      .then(() => {
        Recipe.deleteOne({
          title: "Carrot Cake",
        }).then((deleteRecipe) => {
          console.log("Receta eliminada:", deleteRecipe);
        });
      })
      .then(() => {
        mongoose.connection.close();
        console.log("Database closed");
        process.exit(0);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
