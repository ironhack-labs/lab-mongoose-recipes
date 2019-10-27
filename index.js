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

// const recipes = mongoose.model('recipes', recipeSchema);
// module.exports = recipes;

Recipe.create({
        title: "Sopa",
        level: "Amateur Chef",
        ingredients: "Amor",
        cuisine: "Si",
        dishType: 'Dish', //Type String. Possible values:  - Dish - Snack -  - Dessert - .

        duration: 1,
        creator: "Antonio",
        created: "03-03-2019"



    })
    .then(recipe => { console.log('The recipe is saved and its values are: ', recipe.title) })
    .catch(err => { console.log('An error happened:', err) });



//Insert many recipes

Recipe.insertMany(data, ).then(recipe => {
        console.log('The recipe is saved and its values are: ',
            recipe.map(tit => {
                return tit.title
            })
        )
    })
    .catch(err => { console.log('An error happened:', err) });;

//Correct one mistake

Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
    .then(recipe => {
        console.log('The recipe has been updated',
            recipe
        )

    })
    .catch(err => { console.log('An error happened:', err) });

//Delete a recipe

Recipe.deleteOne({ title: "Carrot Cake" })
    .then(recipe => {
        console.log('The recipe has been deleted',
            recipe
        )

    })
    .catch(err => { console.log('An error happened:', err) });