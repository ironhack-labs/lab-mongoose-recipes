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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    Recipe
      .create({
        title: 'Tortilla de patatas',
        level: 'Amateur Chef',
        ingredients: ['Patatas', 'Huevos', 'Cebolla', 'Sal', 'Aceite'],
        cuisine: 'Española',
        dishType: 'other',
        image: 'https://aws.traveler.es/prod/designs/v1/assets/1200x628/153120.jpg',
        duration: 90,
        creator: 'Fede Mariñas',
      })
      .then(newRecipe => {
        console.log('La nueva receta es', newRecipe.title)
        return Recipe.create(data)
      })
      .then(allRecipes => {
        allRecipes.forEach(recipe => console.log("Hay una receta llamada", recipe.title))

        return Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
      })

      .then(updateDuration => {
        console.log("La duración nueva de Rigatoni alla Genovese es", updateDuration.duration)
        return Recipe.deleteOne({ cuisine: "American" })
      })
      .then(deleteOne => {
        console.log("Hemos eliminado", deleteOne)
        mongoose.connection.close()
      })
      .catch(err => console.log('Error', err))
  })

  .catch(error => {
    console.error('Error connecting to the database', error)
  })
