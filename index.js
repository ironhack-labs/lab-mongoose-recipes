const express = require('express');
const app = express();
const hbs = require('hbs');
const connectDB = require('./config/db')
require("dotenv").config()
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');



//2. MIDDLEWARES

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
connectDB();



  //CREAR RECETA

app.get("/crear-receta", async (req, res) => {
  const newRecipe = {
      title: "Albondigas",
      level: "Principiante",
      ingredients: [ "1/2 Kg Carne Molida",
      "1/4 Sal",
      "4 Tomates",
      "1/2 cebolla blanca",
      "1 vaso de agua",
      "1 diente de ajo",
      "2 cucharadas de aceite" ],
      cuisine: "Comida popular Mexicana",
      dishType: "Principal",
      image: "",
      duration: 60,
      creator: "Chef LePapi",
      created: new Date(),
  };
   //CREAR UNA RECETA EN LA BASE DE Datos
  
  const recipeCreated = await Recipe.create(newRecipe);
  console.log(recipeCreated);
  res.render('create-recipe', {
    data: recipeCreated,
  })
})
  

//CREAR MULTIPLES RECETAS.
app.get('/crear-recetas', async (req, res) => {
    const newRecipes = [{
        title: 'Albondigas',
        level: 'Principiante',
        ingredients: [
            '1/2 Kg Carne Molida',
            '1/4 Sal',
            '4 Tomates',
            '1/2 cebolla blanca',
            '1 vaso de agua',
            '1 diente de ajo',
            '2 cucharadas de aceite',
        ],
        cuisine: 'Comida popular Mexicana',
        dishType: 'Principal',
        image: '',
        duration: 60,
        creator: 'Chef LePapi',
        created: new Date(),
    },
    {
        title: 'Milanesas',
        level: 'Principiante',
        ingredients: [
            '1 Kg de Bisteces',
            '1/4 Sal',
            '1 taza de pan molido',
            '2 huevos batidos',
            '1 cucharada de Ajo molido',
            '200 ml de aceite',
        ],
        cuisine: 'Comida popular Mexicana',
        dishType: 'Principal',
        image: '',
        duration: 60,
        creator: 'Chef Ratatuille',
        created: new Date(),
    }];
    //CREAR VARIAS RECETAS EN LA BASE DE Datos

    const recipesCreated = await Recipe.insertMany(newRecipes);
    console.log(recipesCreated);
  res.render("create-recipes", {
      datos: recipesCreated,
    });
});
  

  // 4. SERVIDOR

app.listen(process.env.PORT, () => {
    console.log(
        `Servidor listo para trabajar, en jueves, en el puerto ${process.env.PORT}`,
    );
});
