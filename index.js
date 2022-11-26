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
  .then(() => {
    Recipe.create({
      title: "Receta 4",
      level: "Easy Peasy",
      ingredients: ["Calienta agua"],
      cuisine: "Mexican",
      dishType: "breakfast",
      image: "",
      duration: 2,
      creator: "Jlaf",
      created:"",
    })
      .then((recipe) => console.log("Mi primera receta insertada", recipe))
      .catch((error) => console.log("Error al insertar mi primera receta", error))

      Recipe.insertMany(data)
      .then(data => console.log("Todas las recetas", data))
      .catch(error => console.log("Error al insertar todos", error))
      

      Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"},{duration:100},{new:true})
      .then(recipe => console.log("Se actualizo la duracion",recipe))
      .catch(error=> console.log("Error al actualizar receta",error))
      
      

      Recipe.deleteOne({title:"Carrot Cake"})
      .then(recipe=>console.log("Se borro con exito", recipe))
      .catch(error => console.log("Error al borrar", error))
      
      

  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

