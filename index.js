//Nos traemos la dependencia de Mongoose
const mongoose = require('mongoose');

// Importamos el modelo Recipe desde la carpeta recipe.models. Ruta => './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //ITERATION 2
    //Agregamos un nuevo documento a partir del modelo estático Recipe
    //pasándole como parametro un nuevo objeto (receta)
    return Recipe.create(
      {
        "title": "Pasta al pesto",
        "level": "Amateur Chef",
        "ingredients": [
          "Pasta 500 g",
          "5 tablespoons olive oil",
          "2 garlic cloves",
          "1 bunch of basil",
          "100 pinions/almonds"
        ],
        "cuisine": "Italian",
        "dishType": "main_course",
        "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
        "duration": 20,
        "creator": "Ratatouille"
      })
      .then((recipe) => {
        console.log(recipe.title)
        //ITERATION 3
        //Importamos los documentos (recetas)
        //provenientes del objeto data(JSON)
        return Recipe.insertMany(data)
          .then((recipes) => {
            recipes.forEach((recipe) =>
              console.log(recipe.title))
            //  //Aplicamos metodo error() al objeto Console
          })
          .catch(error => {
            console.error('Error connecting to the database', error);
          })


      })
  })