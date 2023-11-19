const mongoose = require('mongoose');
const recipes = require("./data.json");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create(data)
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Delicious Spaghetti Carbonara',
      level: "Amateur Chef",
      ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g Pecorino cheese', 'Salt and black pepper to taste'],
      cuisine: "Italian",
      dishType: "main_course",
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 30,
      creator: "Chef Julia",
      created: Date.now()
    })
  })
  
  .then(() => {
    // Con el método Recipe.findOneAndUpdate() actualizamos la duración de la receta 'Rigatoni alla Genovese'
    // El primer parámetro es el filtro (qué receta queremos actualizar)
    // El segundo parámetro es el cambio que queremos hacer
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    // Con el método Recipe.deleteOne() borramos la receta 'Carrot Cake'
    // El primer parámetro es el filtro (qué receta queremos borrar)
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    // Cerramos la conexión a la base de datos
    return mongoose.connection.close();
  })
  .then(() => {
    // Si todo ha ido bien, mostramos un mensaje
    console.log('Connection closed');
  })
  .catch(error => {
    // Si hay algún error, lo mostramos por consola
    console.error(error);
  });
  

