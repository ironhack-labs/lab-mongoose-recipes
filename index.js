const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })


  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
Recipe.collection.drop()
  .then(x => Recipe.create({
    title: 'Macarrones con tomate',
    level: "UltraPro Chef",
    ingredients: ["Macarrones", "Tomate"],
    cuisine: "Italiana",
    dishType: "Dish",
    duration: 20,
    creator: "GLledo & LAPP",

  }))
  .then(theNewRecipe => console.log(`La nueva receta es ${theNewRecipe.title}`, theNewRecipe))
  .then(() => Recipe.insertMany(data))
  .then(Recipe.find())
  .then(allRecipes => allRecipes.forEach(elm => console.log(`Los titulos son ${elm.title}`)))
  .then(() => Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  }))
  .then(x => console.log(`Se ha actualizado la duracion`))
  .then(() => Recipe.deleteOne({
    title: "Carrot Cake"
  }))
  .then(x => console.log(`Se ha borrado`))
  .then(() => mongoose.connection.close())
  .then(() => console.log(`Se ha cerrado la conexion`))
  .catch(error => console.log(`Se produjo un error: ${error}`))