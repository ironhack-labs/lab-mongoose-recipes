const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', false)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);


    return Recipe.deleteMany()
  })

  .then(() => {
    Recipe
      .create({ Title: 'tortilla de patatas', level: 'Amateur Chef', ingredients: ['Aceite, patatas, huevos, sal '], cuisine: 'Mediterranea', dishType: 'main_course', image: 'https://cdn.elcocinerocasero.com/imagen/receta/1000/2022-06-15-19-04-10/tortilla-de-patata.webp', duration: 40, creator: 'Daniel de Miguel' })
  })
  .then(() => {
    Recipe
      .insertMany(data)
      .then(newRecipes => console.log('se han creado las recetas', newRecipes))
      .catch(error => {
        console.error('Error connecting to the database', error);
      })
      .then(() => {
        Recipe
          .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then(updateRecipe => console.log('se ha modificado?', updateRecipe))
      })
      .catch(error => {
        console.error('Error connecting to the database', error);
      });


  });
