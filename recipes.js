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
    let promises = [];
    console.log(`Se han terminado de cargas las recetas de data.js`);
    recipes
      .map(recipe => recipe.title)
      .forEach(title => {
        console.log(`Receta ingresada: ${title}`);
      });
    // updating one recipe just after it were inserted, otherwise
    // the update may run before the insertions have finished
    let promise1 = Recipe.updateOne(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } }
    )
      .then(resp => {
        console.log(`Receta actualizada`);
      })
      .catch(err => {
        console.log(`Error al actualizar receta ${err}`);
      });
    promises.push(promise1);
    // removing one recipe
    let promise2 = Recipe.remove({ title: "Carrot Cake" })
      .then(resp => {
        console.log(`Receta Carrot Cake eliminada`);
      })
      .catch(err => {
        console.log(`Error al eliminar receta Carrot Cake: ${err}`);
      });
    promises.push(promise2);

    // Only after both previous promises have been fulfilled, close connection
    Promise.all(promises).then(resp => {
      console.log(`Comenzando cierre de conexion a mongodb`);
      mongoose
        .disconnect()
        .then(resp => {
          console.log(`Cierre de conexion finalizado`);
        })
        .catch(err => {
          console.log(`Error al cerrar la conexion a mongodb`);
        });
    });
  })
  .catch(err => {
    console.log(`Èrror al ingresar las recetas de data.js`);
  });
