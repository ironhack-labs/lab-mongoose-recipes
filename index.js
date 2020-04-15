const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Tortilla de patata',
      level: 'Easy Peasy',
      ingredients: ['huevos', 'patatas', 'sal', 'aceite', 'cebolla'],
      cuisine: 'Mediterranean',
      dishType: 'main_course',
      duration: 45,
      creator: 'Dayan & Héctor'
    })

  })
  .then(newRecipe => console.log(`Se ha añadido:`, newRecipe))
  .then(() => Recipe.create(data))
  .then(manyRecipes => console.log(`Se han añadido las siguientes recetas: ${manyRecipes}`))
  .then(() => Recipe.findOneAndUpdate({ title: `Rigatoni alla Genovese` }, { duration: 100 }, { new: true }))
  .then(recipeUpdater => console.log(`La receta actualizada es:${recipeUpdater}`))
  .then(() => Recipe.deleteOne({ title: `Carrot Cake` }))
  .then(recipeDeleted => console.log(`Se ha eliminado: ${recipeDeleted}`))
  .then(() => mongoose.connection.close())
  .then(() => console.log(`La conexión a la base de datos ha sido cerrada`))
  .catch(error => console.error('Error connecting to the database', error))
