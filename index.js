const mongoose = require('mongoose');

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

    Recipe.create({
      title: 'Macarrones',
      level: 'Easy Peasy',
      ingredients: ['Pasta', 'Tomate', 'Queso'],
      cuisine: 'Italiana',
      dishType: 'main_course',
      duration: '20',
      creator: 'Anónimo'
    })
      .then((nuevaReceta) => {
        console.log('Receta creada con éxito:', nuevaReceta);
      })
      .catch((error) => {
        console.error('Error al crear la receta:', error);
      });
  
  
    const recipies = require('./data.json');
  
    Recipe.insertMany(recipies)
      .then((recipies) => {
        recipies.forEach((rec) => console.log(rec.title))
        
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
          .then((updatedRecipe) => {
            console.log('Receta actualizada con éxito:', updatedRecipe.duration);
          })
          .catch((error) => {
            console.error(error);
          })
          
        Recipe.deleteOne({title: 'Carrot Cake'})
          .then( console.log('Receta borrada con exito'))
          .catch()

      })
  
      .catch((error) => console.log(error));
  

      
    

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  