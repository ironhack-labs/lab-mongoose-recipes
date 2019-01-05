const express = require('express');
const app = express();

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Recipe = require('./models/Recipe.js')
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



  app.get('/', (req, res) => {
    
    Recipe.insertMany(data, (err) => {
      if (err) { throw(err) }
      console.log(`Recipes created`)
      // mongoose.connection.close()
    });
    
  });

  app.get('/crear-receta', (req, res) => {
    
    Recipe.create({
      title: 'Bacalao',
      level: 'Amateur Chef',
      ingredients: ['Bacalao', 'Tomatoes', 'Almonds', 'Garlic', 'Onion', 'Parsley', 'Olives', 'Capes'],
      cuisine: 'Spanish',
      dishType: ['Dish'],
      image: 'https://www.trbimg.com/img-5943e7e6/turbine/ct-hoy-7969983-bacalao-un-clasico-navideno',
      duration: 120,
      creator: 'unknown'
    }, (err) => {
      if (err) { throw(err) }
      console.log(`Recipe created`)
    });
  })

 const changeRecipe = () => { 
    Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
    .then(() =>{
      console.log ('Se actualizó la receta');
    })
    .catch(err => console.log (err));
}

//changeRecipe();
    
const deleteRecipe = () => { 
  Recipe.deleteOne({ title: "Carrot Cake"})
  .then(() =>{
    console.log ('Se eliminó la receta');
  })
  .catch(err => console.log (err));
}

//deleteRecipe();

const createRecipe = () => {
  Recipe.create({
    title: 'Tacos la lechuza',
    level: 'Amateur Chef',
    ingredients: ['Bacalao', 'Tomatoes', 'Almonds', 'Garlic', 'Onion', 'Parsley', 'Olives', 'Capes'],
    cuisine: 'Spanish',
    dishType: ['Dish'],
    image: 'https://www.trbimg.com/img-5943e7e6/turbine/ct-hoy-7969983-bacalao-un-clasico-navideno',
    duration: 120,
    creator: 'unknown'
  }, (err) => {
    if (err) { throw(err) }
    console.log(`Recipe created`)
    mongoose.connection.close()
  });
}

createRecipe()

app.listen(3000, () => console.log('Listo en el puerto 3000'));

