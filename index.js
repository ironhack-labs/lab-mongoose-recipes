// 1. IMPORTACIONES

const express = require("express")
const app = express()

const hbs = require("hbs")

const { connect } = require("mongoose")
const connectDB = require("./config/db")

require("dotenv").config()


const Recipe = require('./models/Recipe.model');
const data = require('./data');




// 2. MIDDLEWERS

app.use(express.static("public"))

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials")

connectDB()



// 3. RUTAS

// CRUD: Patron de operaciones, que nos permite manipular datos de un proyecto de software
// (Crear, leer, actualizar, borrar)



app.get("/home", (req, res) => {
  res.render("home")
})




app.get("/c-recipe", async (req, res) => {

  const myNewRecipe = {

    title: "Taco random",
    level: "Promaster300",
    ingridients: ["Mole", "Tortilla", "Sal", "Carne", "Pimienta", "Chile Morron"],
    cuisine: "Mexasian",
    dishType: "Platillo Principal",
    image: "https://i.ytimg.com/vi/LTffYgdWs8M/maxresdefault.jpg",
    duration: 200,
    creator: "Chef Javier"
  }


  // ITERACION.2
  // Crea mi receta en la base de datos

  const recipeCreated = await Recipe.create(myNewRecipe)

  res.render("c-recipe", {

    data: recipeCreated
 
  })
})


// ITERACION.3
// Crea multiples recetas en la base de datos

 
app.get("/c-recipes", async (req, res) => {

  const recipesCreated = await Recipe.insertMany(data)
  console.log(recipesCreated)

  res.render("c-recipes")

})  




//  ITERACION.4
// Find the user with id '61973da6701c132a1892eee7' and update its duration -=120 = 100 total;

Recipe.findById('61973da6701c132a1892eee7')
  .then(Recipe => {
    Recipe.duration = 100;
    return Recipe.save(); // Update the user '61973da6701c132a1892eee7' and return a promise
  })
  .then(Recipe => console.log('The user was updated: ' + Recipe))
  .catch(err => console.log('An error occurred:', err));


  // MUESTRA ESTO EN TERMINAL PERO NO EN MONDODB
  /* The user was updated: {
    ingridients: [],
    _id: 61973da6701c132a1892eee7,
    title: 'Rigatoni alla Genovese',
    level: 'Easy Peasy',
    cuisine: 'Italian',
    dishType: 'main_course',
    image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
    duration: '100', <------------------- ACTUALIZADO
    creator: 'Chef Luigi',
    __v: 0
} */






//  ITERACION.5

Recipe.findByIdAndRemove('619744154791d5303454b00b')
.then(Recipe => {
  return Recipe.deleteOne({title: "Carrot Cake"}) 
})
.then(Recipe => console.log('The user was deleted: ' + Recipe))
.catch(err => console.log('An error occurred:', err));

Recipe.deleteOne({title: "Carrot Cake"})

// LO BORRA EN CONSOLA MAS NO EN MONGO
/* The user was deleted: {
  ingridients: [],
  _id: 619744154791d5303454b00b,
  title: 'Carrot Cake',
  level: 'Amateur Chef',
  cuisine: 'International',
  dishType: 'dessert',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg',
  duration: '130',
  creator: 'Chef Nadia',
  __v: 0
} */



//4. SERVIDOR

app.listen(process.env.PORT, () => {
  console.log(`Servidor listo para trabajar, ${process.env.PORT}`)
})






