// 1. IMPORTACIONES

const express   = require("express");
const hbs       = require("hbs");
const path      = require("path");
const app       = express();
const mongoose = require('mongoose');

// Import of the data from './data.json'
const data = require('./data');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');


// 2. MODELOS



// 3. MIDDLEWARES
// a) Establecer las áreas públicas (accesos del usuario desde el navegador, incluye imágenes y estilos css)

// b) Establecer la carpeta de vistas

// c) Establecer el motor de plantillas


// 4. RUTAS

//ITERATION 2. Create a recipe

app.get("/newrecipe",async ()=>{

let info = {
  "title": "muslitos de chicken",
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
}
  let recipeCreated = await Recipe.create(info)
        console.log(recipeCreated.title)
})

// ITERATION 3. Insert multiple recipes
app.get("/addrecipes",async ()=>{

    let recipesAdded = await Recipe.insertMany(data)

      recipesAdded.map((element)=>{
        console.log(element.title)
      })
          //console.log(recipesAdded)

  })

// ITERATION 4. Update a recipe

app.get("/updaterecipe", async ()=>{


  let updatedRecipe = await Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"},{duration:99})

  console.log("successful update",updatedRecipe)
})

// ITERATION 5. Remove a recipe

app.get("/deleterecipe", async ()=>{

  let deletedRecipe = await Recipe.deleteOne({ title: "Carrot Cake"})

  console.log("successful removal")
})

// ITERATION 6. Close the database
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// 5. SERVIDOR

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    
// Before adding any documents to the database, let's delete all previous entries
  //  return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  app.listen(3006,()=>{
    console.log("server iniciado")
  })