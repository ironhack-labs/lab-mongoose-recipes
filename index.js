// const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data'); // <---- IMPORTA TODAS LAS RECETAS DE data.json


// 1. IMPORTACIONES----------------------------------------------------------------
const express 		= require("express")        //<------------ LLAMAR A EXPRESS
const app		     	= express()

const hbs	    		= require("hbs")          //<------------ LLAMAR A HBS
const connectDB   = require("./config/db") // trae el doc db.js //<------------ LLAMAR A MONGO

require("dotenv").config()            //<------------ LLAMAR A DOTENV

//Body es una libreria de npm que nos ayuda a leer los datos enviados por el cliente a travez de un metodo post o put (req params) - ver recipe controller (npm i body-parser)
const bodyParser =  require("body-parser") // OJO linea 33 se llama al proyecto

const recipesController     = require("./controllers/recipes.controllers")
// console.log(recipesController) // <---- {getRecipes: [AsyncFunction: getRecipes], putRecipes: [AsyncFunction: putRecipes]}

//2. MIDDLEWARES----------------------------------------------------------------
// Es una funcion que se ejecuta despues de recibir una peticion (request) y antes de dar una respuesta
app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

app.use(bodyParser.urlencoded({extended:true})) //ayuda a leer los datos del cliente


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

// app.get("/recetas", async (req,res) =>{

//     const allRecipes = await Recipe.insertMany(data)
//       console.log("Base de Datos poblada con recetas")
//       res.render("recipes", {
//         miReci: allRecipes
//       })
// })

app.put("/recetas", async (req,res) =>{

  const allRecipes = await Recipe.insertMany(data)
    console.log("Base de Datos poblada con recetas")
    res.render("recipes", {
      miReci: allRecipes
    })
})


//  --------------------------**Update MULTIPLES RECETA**-------------------(Array)---------

//getRecipes y putRecipes se crearon las funciones en Controllers
app.get("/todas-recetas", recipesController.getRecipes)
//id a travez de la url
// app.put("/:id/update", recipesController.putRecipes)

app.put("/:id/update", async (req,res) =>{
    const {id} = req.params   // Destruccturacion de objetos (parametros de la url)
    const { duration } = req.body  //(datos del formulario body-parser)
                            // id que estamos buscando
    await Recipe.findByIdAndUpdate(id, {duration}, {new:true})  // Documentacion de Mongoos - busca un id y lo modifica //que propiedades vas a
    res.redirect("/todas-recetas")   
})







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
