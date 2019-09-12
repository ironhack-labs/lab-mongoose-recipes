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


// let bananaPancakes = {
//     title: "bananaPancakes",
//     ingredients: ['bananas', 'pancakes']
// }

// Recipe.create(bananaPancakes, function(err, recipe) {
//     if (err) {
//         console.log('An error happened:', err);
//     } else {
//         console.log('The recipe we created is: ', recipe);
//     }
// });



console.log(Recipe);

// Recipe.insertMany(data);