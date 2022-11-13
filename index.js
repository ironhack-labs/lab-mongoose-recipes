const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

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
        return Recipe.insertMany(data)
            .then(createdRecipe => console.log(createdRecipe))
            .catch(error => {
                console.error('Error connecting to the database', error);

            })

        // Run your code here, after you have insured that the connection was made
    })
    .then(() => {
        return Recipe.findOneAndUpdate(
            {
                title: "Rigatoni alla Genovese"
            },
            { duration: 100 },
            { new: true })
            .then(updateRecipe => console.log(updateRecipe, "updated sucesfull!"))
            .catch(error => {
                console.error('Error connecting to the database', error);

            })
    })
    .then(() => {
        return Recipe.deleteOne(
            { title: "Carrot Cake" }
        )
            .then(deleteRecipe => console.log(deleteRecipe, "Carrot cake deleted sucesfull"))
            .catch(error => {
                console.error('Error connecting to the database', error)
            });
    })
    .then(() => {
        mongoose.connection.close()
        console.log("close")
    })
    .catch(error => {
        console.error('Error connecting to the database', error);

    })





