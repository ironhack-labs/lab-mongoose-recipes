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

//  Recipe.create({ name: 'Alice', password:"ironhack2018", job: 'Architect' }, function (err, user) {
//     if (err) {
//         console.log('An error happened:', err);
//     } else {
//         console.log('The user is saved and its value is: ', user);
//     }
//   });



let Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.createCollection().then(function(collection) {
    console.log('Collection is created!');
});