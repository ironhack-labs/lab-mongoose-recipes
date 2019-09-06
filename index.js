const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

//to fix deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connection to the database "recipeApp"
mongoose
    .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });

//    Create Recipe
Recipe.create({ title: 'Lasagne', cuisine: 'special' }).then(recipe => {
    console.log(recipe.title);
});

// //Insert data from document
Recipe.insertMany(data).then(recipes => {
    //"recipes" is the array of documents that were added in the collection
    for (const recipe of recipes) {
        console.log(recipe.title);
    }
    // Update the Recipe
    Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
        .then(() => {
            console.log('Update successfully done');
        })
        .catch(err => {
            console.log('Error at update: ', err);
        });
    // Delete the Recipe
    Recipe.deleteOne({ title: 'Carrot Cake' })
        .then(() => {
            console.log('Successfully deleted');
        })
        .catch(err => {
          console.log('Error at deletion: ', err);
          mongoose.connection.close();
        });
});

