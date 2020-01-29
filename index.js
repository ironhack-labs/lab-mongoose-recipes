const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'


const myInfo = {
    title: 'Mole Poblano',
    level: 'Amateur Chef',
    ingredients: ['chocolate amargo', 'chile ancho', 'chile mulato', 'chile pasilla', 'chipotle'],
    cuisine: 'Mexican',
    dishType: 'Dish',
    duration: 90,
    creator: 'Los poblanos gg'
}

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipe-app-dev', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        //Iteration 1
        // Recipe.create(myInfo)
        //     .then(food => console.log(food))
        //     .catch(err => console.log(err));

        //Iteration 2
        // Recipe.create(data)
        //     .then(manyData => console.log(manyData))
        //     .catch(err => console.log(err));
    })
    .catch(err => console.error('Error connecting to mongo', err));