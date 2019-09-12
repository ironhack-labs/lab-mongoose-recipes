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

function makeSinglePancake() {
    let bananaPancakes = {
        title: 'Banana Pancakes',
        level: 'Easy Peasy',
        ingredients: Array,
        cuisine: 'unhealthy',
        dishType: 'Breakfast',
        duration: 30,
        creator: 'John',
    }
    let recipe = new Recipe(bananaPancakes)
    recipe.save()
    console.log(recipe)
}

function makeManyRecipes() {
    Recipe.insertMany(data)
    console.log(Recipe.find({}).map(r => r.title))
}

function fixOne() {
    recipe = Recipe.findOne({ title: "Rigatoni alla Genovese" })
    recipe.update({ duration: 100 })
        .then(data => console.log('Successfully updated recipe', data))
}

function deleteOne() {
    Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(data => console.log('Successfully removed carrot cake!', data))
}

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});