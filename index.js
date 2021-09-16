const express = require("express");
const app = express();

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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // mongoose.connection.close();

    const recipe = new Recipe({
      title: "Huevos rancheros",
      level: "Easy Peasy",
      ingredients: [
        "2 tomatoes",
        "1/2 onion",
        "2 eggs",
        "pinch of salt",
        "2 tortillas",
        "2oz oil",
      ],
      cuisine: "Mexican",
      dishType: "Break fast",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 10,
      creator: "Erick Rodriguez",
      created: new Date(),
    });

    const promise1 = Recipe.create(recipe)
      .then((newRecipe) => {
        console.log(`Receta creada : ${newRecipe.title}`);
      })
      .catch((error) => {
        console.log(`Hubo un error al agregar una receta: ${error}`);
      });

    const promise2 = Recipe.insertMany(data)
      .then((newRecipes) => {
        newRecipes.forEach((item, index) => {
          console.log(`Recetas enviadas: ${index} - ${item.title}`);
        });
      })
      .catch((error) => {
        console.log(`Hubo un error al agregar recetas: ${error}`);
      });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

const promise3 = Recipe.findOneAndUpdate(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 } },
  { new: true }
)
  .then((data) => {
    console.log(`Se actualizó: ${data}`);
  })
  .catch((error) => {
    console.log(`Error al reemplazar: ${error}`);
  });

const promise4 = Recipe.deleteOne({ title: "Carrot Cake" })
  .then((data) => {
    console.log(`Se borro : ${data.n} - ${data.ok} - ${data.deletedCount}`);
  })
  .catch((error) => {
    console.log(`No borro por que: ${error}`);
  });

// Promise.all({ promise1, promise2, promise3, promise4 })
//   .then((values) => {
//     if (values === true) {
//       mongoose.connection.close();
//     }
//   })
//   .catch((error) => console.log(`No han acabado todas las promesas: ${error}`));
