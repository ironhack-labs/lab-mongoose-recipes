const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
     return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const Recipe = require("./models/Recipe.model")
    Recipe
      .create({
        title: "Arroz a Banda",
        level: "UltraPro Chef",
        ingredients: ["Rice", "Salmorreta", "Squid", "Sgrimps", "Fish Broth", "Olive Oil"],
        cuisine: "Spanish",
        dishType: "main_course",
        image: "https://cdn.elcocinerocasero.com/imagen/receta/1000/2019-06-28-12-22-10/arroz-a-banda-con-salmorreta.jpeg",
        duration: 30,
        creator: "Gustavo del Llano",
        created: "2022-02-02"
      })

      .then(newRecipe => {
        console.log('La nueva receta es', newRecipe)
        return Recipe.insertMany(data)
      })
      .then(newRecipes => {
        newRecipes.forEach(elm => console.log('Lista de recetas', elm.title))
        return Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
      })
      .then(updateRecipe => {
        console.log('Receta Actualizada', updateRecipe)
        return Recipe.deleteOne({title: "Carrot Cake"})
      })
      .then(deletedRecipes => console.log("la receta cancelada es", deletedRecipes))

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

   mongoose.connection.close()