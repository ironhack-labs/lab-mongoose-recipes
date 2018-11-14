const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/Recipe');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  Recipe.collection.drop();

  // Create One Recipe

  Recipe.create({ 
    title: 'Paella',
    level: 'Amateur Chef',
    ingredients: ['Arroz', 'Caldo de Pescado', 'Verduras', 'Marisco'],
    cuisine: 'Española',
    dishType: ['Dish'],
    image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
    duration: 30,
    creator: 'Alberto Soler'
    })
  .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
  .catch(err => { console.log('An error happened:', err) });
  

  // InsertMany

  Recipe.insertMany(data)
  .then((recipes) => { 
    recipes.forEach(recipe =>{
      console.log(recipe.title);
    })
    return Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
  })
  .then(() => {
    console.log('The recipe has been updated!');
    return Recipe.deleteOne({ title: "Carrot Cake"})
  })
  .then(() => {
    console.log('The recipe has been deleted!');
    mongoose.connection.close()
  })
  .catch(err => { console.log('An error happened:', err) });


