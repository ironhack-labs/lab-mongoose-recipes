const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



Recipe.create({
  title: 'Marcos recipe',
        level: 'Amateur Chef',
        ingredients: ['penne', 'sauce','cheese'],
        cuisine: 'Italian',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 20,
        creator: 'Italian Ironman'
}).then(recipeFromDB =>{console.log(recipeFromDB.title)}).catch(err => {console.log(err)})
