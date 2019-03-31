const mongoose = require('mongoose');
const Recipe = require('./models/recipes.models');
const recipes = require('./data.js')

require('./config/db.config');

const recipe =  {
  title: 'Gazpacho',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup Olive Oil', '1kg Tomatos', '1 Green Pepper', '1/2 garlic', '1/4 cup vinager', 'Water' ],
  cuisine: 'Spanish',
  dishType: ['Drink'],
  image: 'https://www.cocinaabuenashoras.com/files/gazpacho-andaluz-vasos-768x512.jpg',
  duration: 30,
  creator: 'Andalusian Chef'
}

//Iteracion 2
Recipe.create(recipe) // se añade la receta
  .then(() => console.log('Saving new recipe: ', recipe.title))
  .catch(error => console.error(error));

//Iteracion 3
Recipe.create(recipes) // se añaden las otras recetas
  .then((recipes) => { 
    for (let recipe of recipes) {
      console.info('Saving new recipe: ', recipe.title)
    }
  })
  .then(()=> {  // Iteracion 4
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{ $set:{ duration: 100 }})
      .then(() => console.log('Recipe Rigatoni alla Genovese update'))
  })
  .then(()=> { // Iteracion 5
    return Recipe.findOneAndRemove({title: 'Carrot Cake'})
      .then(() => console.log('Recipe Carrot Cake removed!'))
  })
  .then(() => mongoose.connection.dropDatabase()) // Para borrar la base datos, 
  // también dentro de mongo y de la base usar comando db.dropDatabase
  .then(() => mongoose.connection.close()) // Iteracion 
  .catch(error => console.error(error));