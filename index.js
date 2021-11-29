//1. IMPORTACIONES


const express = require("express")
const app = express()
const hbs = require("hbs")
const connectDB = require('./config/db')

const Recipe = require('./models/Recipe.model');

require("dotenv").config()

// Import of the data from './data.json'
const data = require('./data');

// const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//2. MIDDLEWARES

app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials')

connectDB()


//CREAR RECETA
app.get("/create-recipe", async (req, res) =>{

  const newRecipe = {
    title: "Chocolate Chip Cookies",
    level: "Amateur Chef",
    ingredients: [
      "1/2 cup light brown sugar",
      "1 large egg",
      "2 tablespoons milk",
      "1 1/4 teaspoons vanilla extract",
      "2 cups semisweet chocolate chips"
    ],
    cuisine: "French",
    dishType: "dessert",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
    duration: 30,
    creator: "Chef Jennifer"

  }

  //CREAR UNA RECETA EN LA BD
  const recipeCreated = await Recipe.create(newRecipe)

  console.log(recipeCreated)
  res.render("created-recipe",{
    data:recipeCreated
  })



})


//4. SERVIDOR

app.listen(process.env.PORT, () =>{
  console.log(`Servidor listo en el puerto ${process.env.PORT}`);


})

