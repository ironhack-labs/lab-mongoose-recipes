const mongoose = require('mongoose');
const Recipe = require('./Recipe.js');
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: "French Onion Soup",
  level: "Easy Peasy",
  ingredients: [
    "- 1/2 cup unsalted butter",
    "- 2 tablespoons olive oil",
    "- 4 cups sliced onions",
    "- 4 (10.5 ounce) cans beef broth",
    "- 2 tablespoons dry sherry (optional)",
    "- 1 teaspoon dried thyme",
    "- salt and pepper to taste",
    "- 4 slices French bread",
    "- 4 slices provolone cheese",
    "- 2 slices Swiss cheese, diced",
    "- 1/4 cup grated Parmesan cheese"
  ],
  cuisine: "French",
  dishType: "Dish",
  image:
    "https://i.blogs.es/179747/sopa/450_1000.jpg",
  duration: 45,
  creator: "Philippe Saez" 
  })
  .then(receta => {
    console.log('Nueva receta:', receta.title);
  })
  .catch(err => {
    console.log('Error al crear nueva receta', err);
  });

Recipe.insertMany(data)
  .then(recetas => {
  console.log('Recetas importadas desde el archivo data.js');
  recetas.map(receta => receta.title).forEach(title => {
      console.log('Receta importada:', title);
    })
  })
  .catch(err => {
    console.log('Error al importar recetas desde data.js', err);
  }); 

Recipe.updateOne(
  { title: "Rigatoni alla Genovese" },
  { $set: { duration: 100 }}
  )
  .then(() => {
    console.log('La receta Rigatoni alla Genovese ha sido actualizada');
  })
  .catch(err => {
    console.log('Error al actualizar Rigatoni alla Genovese', err);
  });

Recipe.deleteOne(
  {title: "Carrot Cake"}
  )
  .then(() => {
    console.log('La receta de Carrot Cake ha sido eliminada');
  })
  .catch(err => {
    console.log('Error al eliminar Carrot Cake', err);
  });

mongoose.connection.close()
  .then(() => {
    console.log('Disconnected to Mongo!');
  })
  .catch(err => {
    console.error('Error disconnecting to mongo', err);
  });