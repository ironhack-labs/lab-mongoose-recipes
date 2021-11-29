//1. IMPORTACIONES


const express = require("express")
const app = express()
const hbs = require("hbs")
const connectDB = require('./config/db')

const Recipe = require('./models/Recipe.model');

require("dotenv").config()

// Import of the data from './data.json'
// const data = require('./data');

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
  res.render("create-recipe",{
    data:recipeCreated
  })

})

app.get("/create-recipes", async(req, res)=>{

    const newRecipes = [
      {
        "title": "Asian Glazed Chicken Thighs",
        "level": "Amateur Chef",
        "ingredients": [
          "1/2 cup rice vinegar",
          "5 tablespoons honey",
          "1/3 cup soy sauce (such as Silver Swan®)",
          "1/4 cup Asian (toasted) sesame oil",
          "3 tablespoons Asian chili garlic sauce",
          "3 tablespoons minced garlic",
          "salt to taste",
          "8 skinless, boneless chicken thighs"
        ],
        "cuisine": "Asian",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        "duration": 40,
        "creator": "Chef LePapu"
      },
      {
        "title": "Orange and Milk-Braised Pork Carnitas",
        "level": "UltraPro Chef",
        "ingredients": [
          "3 1/2 pounds boneless pork shoulder, cut into large pieces",
          "1 tablespoon freshly ground black pepper",
          "1 tablespoon kosher salt, or more to taste",
          "2 tablespoons vegetable oil",
          "2 bay leaves",
          "2 teaspoons ground cumin",
          "1 teaspoon dried oregano",
          "1/4 teaspoon cayenne pepper",
          "1 orange, juiced and zested"
        ],
        "cuisine": "American",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
        "duration": 160,
        "creator": "Chef John"
      },
      {
        "title": "Carrot Cake",
        "level": "Amateur Chef",
        "ingredients": [
          "6 cups grated carrots",
          "1 cup brown sugar",
          "1 cup raisins",
          "4 eggs",
          "1 1/2 cups white sugar",
          "1 cup vegetable oil",
          "2 teaspoons vanilla extract",
          "1 cup crushed pineapple, drained",
          "3 cups all-purpose flour",
          "1 1/2 teaspoons baking soda",
          "1 teaspoon salt",
          "4 teaspoons ground cinnamon"
        ],
        "cuisine": "International",
        "dishType": "dessert",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
        "duration": 130,
        "creator": "Chef Nadia"
      }

    ]

    const recipesCreated = await Recipe.insertMany(newRecipes)

    console.log(recipesCreated)
    res.render("create-recipes")


})

app.get("/recipes", async (req, res) =>{

  const getAllRecipes = await Recipe.find({})
  console.log(getAllRecipes)

  res.render("recipes", {
    datos: getAllRecipes
  })

})




app.get("/", (req, res) =>{
  res.render("index")
})



//4. SERVIDOR

app.listen(process.env.PORT, () =>{
  console.log(`Servidor listo en el puerto ${process.env.PORT}`);


})

