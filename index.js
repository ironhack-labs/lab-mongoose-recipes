const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo!');
    }).catch(err => {
        console.error('Error connecting to mongo', err);
    });

Recipe
    .create({
        title: 'Tortilla de patata',
        level: 'Amateur Chef',
        ingredients: ['4 huevos', '3 patatas', '1/2 ceboola'],
        cuisine: 'Spanish',
        dishType: 'Dish',
        image: 'https://www.recetasderechupete.com/wp-content/uploads/2016/08/Tortilla-de-patatas-525x360.jpg',
        duration: 45,
        creator: 'Arguiñano'
    }).then(data => {
        console.log(data.title)
    })
    .catch(err => {
        console.log(err)
    });