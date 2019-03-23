const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe')

mongoose
  .connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe
  .create({title: 'Empanadas de carne', level: 'Easy Peasy', ingredients: ['tapa de empanadas', 'carne picada', 'papa', 'cebolla'], cuisine: 'Latin american', dishType: 'Dish', image: 'https://okdiario.com/img/recetas/2016/08/30/empanadas-argentinas.jpg', duration: 20, creator: 'Tomas Freire'})
  .then(recipe => {
    console.log(`You have successfully added the recipe for ${recipe.title}`)
  })
  .catch(err => {
    console.log(`There has been an error creating a document: ${err}`)
  });

Recipe
  .insertMany(data)
  .catch(err => {
    console.log(err)
  })
  .then(moreRecipes => {
    console.log(moreRecipes)
      Recipe
        .updateOne({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100}})
        .then( () => {
          console.log('You have successfully changed the duration of the recipe')
        })
        .catch(err => {
          console.log(err)
        });
      Recipe
        .deleteOne({title: 'Carrot Cake'})
        .then( () => {
          console.log('The document has been successfully removed!');
        })
        .catch(err => console.log(err))  
  })


setTimeout( () => {
  mongoose.connection.close()
  .then(() => console.log('Database connection terminated'))
  .catch(err => console.log('There was an error closing the connection to the Database'))
}, 5000);