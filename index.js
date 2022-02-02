const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    return Recipe.create({
      title: "brownies",
      level: "Amateur Chef",
      ingredients: "huevos, azucar, chocolate, arina, mantequilla, nueces",
      cuisine: "americana",
      dishType: "dessert",
      duration: 40,
      Creator: "angela"
    })
  })
  .then((theNewRecipe) =>{
    console.log(`Este es mi receta ${theNewRecipe.title}`)  // al ser un objeto puedo imprimir la porpiedad directamente. 
    return Recipe.insertMany(data) // metodo que devuelve la promesa
  })
  .then(newrecipes => {
    newrecipes.forEach((elem) => console.log(elem.title))   // funcion flecha que me devuelve un array y por eso puedo usar forEach
    return Recipe.findOneAndUpdate ({title:"Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(newtime => { console.log(newtime)})
  
  .catch((err) => {console.log("ERROR DE MONGOOSE ---- ", err)})       