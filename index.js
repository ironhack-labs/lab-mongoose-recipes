const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.js'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
    .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

// Creating a new recipe document
const firstCreate = () =>
    Recipe.create({
        title: 'Not Omellete',
        level: 'Amateur Chef',
        ingredients: ['eggs', 'salt', 'olive oil'],
        cuisine: 'Western',
        dishType: 'Breakfast',
        image: 'https://unsplash.com/photos/6rtm6a_aVyE/download?force=true',
        duration: 20,
        creator: 'A human'
        // created:
    }).then(data => {
        console.log(data.title);
    });

// Creating a new recipe documents from data.js
const manyRecipes = () =>
    Recipe.insertMany(data).then(data => {
        data.forEach(el => {
            console.log(el.title);
        });
    });

// Update one field [you could also do updateOne]. Adding, new true ensures that the data returned in the console log is the updated 'new' data
const updateOne = () =>
    Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true }).then(
        () => {
            console.log('Updated Successfully');
        }
    );

// delete a document based on query
const deleteOne = () =>
    Recipe.findOneAndDelete({ title: 'Carrot Cake' }).then(data => {
        console.log('Carrot Cake Deleted');
    });

firstCreate()
    .then(manyRecipes)
    .then(updateOne)
    .then(deleteOne)
    .then(() => {
        console.log('Mongoose Disconnected');
        mongoose.disconnect();
    })
    .catch(err => {
        console.log(err);
    });
