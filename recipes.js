const mongoose = require("mongoose");
const data = require("./data.js");
const Recipe = require("./models/Recipe");

// connection to database
mongoose
  .connect("mongodb://localhost/recipeApp", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Mongo!");
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// deletes all collection, for test purposes
Recipe.deleteMany()
  .then(recipes => {
    console.log(`Coleccion eliminada`);
  })
  .catch(err => {
    console.log(`Error al eliminar coleccion completa`);
  });

// create a simple recipe
Recipe.create({
  title: "Lasagna de pavo",
  level: "Amateur Chef",
  ingredients: [
    "Molida de pavo",
    "Queso camembert",
    "Pasta lasagna",
    "Jitomates",
    "Ajo",
    "Queso Parmesano",
    "Aceite de oliva",
    "Cilantro"
  ],
  cuisine: "Italiana",
  dishType: "Dish",
  image:
    "https://static01.nyt.com/images/2015/10/15/dining/15RECIPE20DIN/15RECIPE20DIN-superJumbo.jpg",
  duration: 160,
  creator: "Chef Buddy"
})
  .then(receta => {
    console.log(`Titulo de Receta ingresada: ${receta.title}`);
  })
  .catch(err => {
    console.log(`Error al ingresar receta: ${err}`);
  });

// populate database with array
Recipe.insertMany(data)
  .then(recipes => {
    console.log(`Se han terminado de cargas las recetas de data.js`);
    recipes
      .map(recipe => recipe.title)
      .forEach(title => {
        console.log(`Receta ingresada: ${title}`);
      });
    // updating one recipe just after it were inserted, otherwise
    // the update may run before the insertions have finished
    Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    )
      .then(recipe => {
        console.log(`Receta actualizada`);
      })
      .catch(err => {
        console.log(`Error al actualizar receta ${err}`);
      });
  })
  .catch(err => {
    console.log(`Èrror al ingresar las recetas de data.js`);
  });
