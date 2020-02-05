const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

let recipe1 = {
  title: "Canelones",
  level: "Amateur Chef",
  ingredients: ["Pasta", "Queso", "Tomatico"],
  cuisine: "Italiana",
  dishType: "Dish",
  duration: 30,
  creator: "La yaya"
};

let recipe2 = {
  title: "Ensalada",
  level: "Easy Peasy",
  ingredients: ["Lechuga", "Cebolla", "Tomate"],
  cuisine: "Mediterranea",
  dishType: "Dish",
  duration: 5,
  creator: "La cultura popular"
};
let recipe3 = {
  title: "Macarrones",
  level: "Amateur Chef",
  ingredients: ["Macarrones", "Chorizo", "Tomatico"],
  cuisine: "Italiana",
  dishType: "Dish",
  duration: 15,
  creator: "Arguiñano"
};
let recipe4 = {
  title: "Risotto",
  level: "UltraPro Chef",
  ingredients: [
    "Arroz",
    "Panceta",
    "Mantequilla",
    "Caldo de pollo",
    "Paciencia"
  ],
  cuisine: "Italiana",
  dishType: "Dish",
  duration: 60,
  creator: "Miquel Iturriaga"
};

let recipe5 = {
  title: "Champiñones picantes con jamon",
  level: "Amateur Chef",
  ingredients: ["Champiñones", "Jamon", "Cayena"],
  cuisine: "Mediterraneo",
  dishType: "Dish",
  duration: 25,
  creator: "MIguel de Mora"
};

let recipe6 = {
  title: "Zumo de naranja",
  level: "Easy Peasy",
  ingredients: ["Naranja"],
  cuisine: "Tradicional",
  dishType: "Drink",
  duration: 3,
  creator: "España"
};
// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

  })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    // Recipe.remove({})
  })
  .then(x => Recipe.collection.drop())
  .then(x => Recipe.create(recipe1))
  .then(newRecipe => console.log(`La nueva receta se llama ${newRecipe.title}`))
  .then(() => Recipe.insertMany([recipe2, recipe3, recipe4, recipe5, recipe6]))
  .then(newRecipes => console.log(newRecipes))

  .then(x => Recipe.updateOne({
    title: "Risotto"
  }, {
    duration: 100
  }))
  .then(updated => console.log(updated))
  .then(x => Recipe.deleteOne({
    title: "Zumo de naranja"
  }))
  .then(deleted => console.log("Lo has eliminado correctamente"))
  .then(() => mongoose.disconnect())
  .catch(err => console.error("Error connecting to mongo", err))