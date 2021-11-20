// const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');


// 1. IMPORTACIONES----------------------------------------------------------------
const express 		= require("express")        //<------------ LLAMAR A EXPRESS
const app		     	= express()

const hbs	    		= require("hbs")          //<------------ LLAMAR A HBS
const connectDB   = require("./config/db") // trae el doc db.js //<------------ LLAMAR A MONGO

require("dotenv").config()            //<------------ LLAMAR A DOTENV


//2. MIDDLEWARES----------------------------------------------------------------
// Es una funcion que se ejecuta despues de recibir una peticion (request) y antes de dar una respuesta
app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

connectDB()

//3. RUTAS
//CRUD
//Create
//Read
//Update
//Delete

//----------HOME-------------------------------
app.get("/", (req, res) =>{
  res.render("index")
})

//  --------------------------**CREAR**----------------------------
//  --------------------------**CREAR RECETA**----------------------------
// una receta cada vez que recargan la pagina
app.get("/crear-receta", async(req, res) =>{

    const newRecipe = {
      title: "Mi Fideo Seco",
      level: "Easy Peasy Lemon Squeezy",
      ingredients: ["Aceite","fideo","Jitomates","Cebolla","Ajo","Concentrado","Sal","Agua","Queso"],
      cuisine: "YES",
      dishType: "main_course",
      image: "https://cdn7.kiwilimon.com/recetaimagen/28865/29446.jpg",
      duration: 32,
      creator: "Rick Astley",
      created: 2005/05/05
    }

    const recipeCreated = await Recipe.create(newRecipe)

    console.log(recipeCreated)
    res.render("create-recipe", {
      miReci: recipeCreated
    }) 

})

//  --------------------------**CREAR MULTIPLES RECETA**-------------------(Array)---------

app.get("/recetas", async (req,res) =>{

    const allRecipes = await Recipe.insertMany(data)
      console.log(allRecipes)
      res.render("recipes", {
        miReci: allRecipes
      })
})


//  --------------------------**Update MULTIPLES RECETA**-------------------(Array)---------










//4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Servidor escuchando en el puerto http://localhost:${process.env.PORT}`)
})





















// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// // Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(self => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });
