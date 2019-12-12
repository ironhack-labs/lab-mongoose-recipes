const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'


//Recipe is creating on the end
const createRecipe = Recipe.create({
    title: 'Tomato soup',
    level: 'Amateur Chef',
    ingredients: ['2 carrots', '2 sticks of celery', '2 medium onions', '2 cloves of garlic', '2 ', 'olive oil', '2 organic reduced-salt chicken or vegetable stock cubes', '2 x 400 g tins of quality plum tomatoes', '6 large ripe tomatoes', 'fresh basil(15 g)'],
    cuisine: 'European',
    dishType: 'Dish',
    image: 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/xtra_med/625_1_1436957931.jpg?tr=w-430',
    duration: 45,
    creator: 'Jamie Oliver',
    created: "2019-12-12"
})

const instertRecipes = Recipe.insertMany(data)
const updateRecipe = Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
const deleteRecipe = Recipe.findOneAndDelete({ title: "Carrot Cake" })

//DELETE MANY RECIPES:
// const deleteRecipe = Recipe.deleteMany({ title: "Carrot Cake" })
//     .then(() => {
//         console.log("Carrot Cake deleted");
//     })
//     .catch((err) => {
//         console.log("Error", err);
//     })

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .then(() => createRecipe)
    .then(() => {
        console.log("Recipe created");
    })
    .catch((err) => {
        console.log("Err", err);
    })
    .then(() => updateRecipe)
    .then((Recipe) => {
        console.log(Recipe);
    })
    .catch((err) => {
        console.log("Err", err);
    })
    .then(() => deleteRecipe)
    .then(() => {
        console.log("Carrot Cake deleted");
    })
    .catch((err) => {
        console.log("Error", err);
    })
    .then(() => mongoose.connection.close())
    .then(() => console.log("----------DATABASE CLOSED-------------"))
    .catch(err => {
        console.error('Error connecting to mongo', err);
    });