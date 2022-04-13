const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`)
    // Before adding any recipes to the database, let's remove all existing ones
    Recipe
      .deleteMany()
      .then(() => Recipe.syncIndexes())
      .catch(error => console.log('Error borrando:', error))

      .then(() => Recipe.create({ title: 'tortilla', level: "Easy Peasy", ingredients: 'Huevo y patata', cuisine: 'Restaurante', dishType: 'breakfast', duration: 5, creator: "Arturo" }))
      .then(newRecipe => console.log('La nueva receta es', newRecipe.title))
      .catch(error => console.log('Error creando la receta:', error))

      .then(() => Recipe.insertMany(data))
      .then(newRecipes => {
        console.log("Las nuevas recetas son: ")
        newRecipes.forEach((recipe) => console.log(recipe.title))

      })
      .catch(error => console.log('Error insertando las recetas:', error))

      .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
      .then((recipeUpdated) => console.log("¡Receta actualizada con exito!", recipeUpdated.title, recipeUpdated.duration))
      .catch(error => console.log('Error actualizando la receta:', error))

      .then(() => Recipe.deleteOne({ title: "Carrot Cake" }))
      .then((deleteInfo) => console.log("Receta borrada!", deleteInfo))
      .catch(error => console.log('Error borrando la receta:', error))

      .then(() => mongoose.connection.close())
      .then(() => console.log("conection closed"))

  })
  // Run your code here, after you have insured that the connection was made

  .catch(error => {
    console.error('Error connecting to the database', error);
  });
