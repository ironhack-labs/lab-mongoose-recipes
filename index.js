const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// const myRecipe = new Recipe({
//   title: "Arepa con pollo",
//   level: "Easy Peasy",
//   ingredients: ["Harina de maíz precocido", "Pollo"],
//   cuisine: "Venezolana"
// })

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //myRecipe
    // .save()
    // .then(recipe => {
    //   console.log(`Receta nueva ${recipe.title}`)})
    //   .catch(error => {
    //     console.log(error('Error al agregar receta'));
    //   })

    Recipe.create({
        title: "Arepa con pollo",
        level: "Easy Peasy",
        ingredients: ["Harina de maíz precocido", "Pollo"],
        cuisine: "Venezolana"
      })
      .then(recipe => console.log(recipe.title))
      .catch(() => console.log("Error al ingresar receta"))
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((recipes) => recipes.forEach(element => {
        console.log(element.title)
      }))
      .catch(error => console.log("Error al ingresar las recetas", error))
  })
  .then(() => {
    Recipe.findOneAndUpdate({
        title: "Rigatoni alla Genovese"
      }, {
        duration: 100
      })
      .then(recipe => console.log(`Receta de ${recipe.title} actualizada`))
  })
  .then(() => {
    Recipe.deleteOne({
        title: "Carrot Cake"
      })
      .then(() => console.log("Receta eliminada"))
      .catch(error => console.log("Error al eliminar la receta", error))
  })
  .then(() => {
    mongoose.connection.close()
    console.log("Cerrando Mongoose")
  })
  .catch(error => {
    console.log(error('Error connecting to the database', error));
  });