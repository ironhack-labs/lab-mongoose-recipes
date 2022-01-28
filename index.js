const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'

const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
require("./config/db.config")
    // // Import of the data from './data.json'
const data = require("./data");

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
        .then(() => console.log('Database has been cleared'))
        .then(() => Recipe.create(data))
        .then((result) => {
            result.forEach(recipes => console.log(recipes.title))
            return Recipe.findOneAndUpdate({ name: 'Carrot Cake' }, { level: 'Easy Peasy' }, { new: true })
        })
        .then(result => {
            console.log(`Level of ${result.title} has been change to ${result.level}.`)
            return Recipe.findOneAndDelete({ title: 'Chocolate Chip Cookies' })
        })
        .then((result) => {
            console.log(`Recipe ${result.title} has been delete`)
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close())
})


const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });