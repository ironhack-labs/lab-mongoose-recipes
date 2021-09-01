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

  // Create a recipe
  .then(() => {
    Recipe.create({ 
      title: 'Tortilla de patata', 
      level: 'Easy Peasy',
      ingredients: ['huevos', 'patatas', 'aceite', 'sal'],
      cuisine: 'Española',
      dishType: 'main_course',
      image: 'https://yolandanutricionista.com/wp-content/uploads/2019/02/tortilla.jpg',
      duration: 60,
      creator: 'Laura',
      })
    .then(newRecipe => console.log(newRecipe.title))

    // Insert multiple recipes
    .then(() => Recipe.create(data))
    .then(newRecipes => newRecipes.forEach(recipe => console.log(recipe.title)))

    // Update recipe
    .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, {duration: 100}))
    .then(() => console.log('La duración de la receta se ha actualizado con éxito.'))

    // Remove a recipe
    .then(() => Recipe.deleteOne({ title: 'Carrot Cake' }))
    .then(() => console.log('La receta se ha eliminado con éxito.'))
  
    // Close the Database
    .then(() => mongoose.connection.close(() => console.log('Mongoose default connection closed')))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
