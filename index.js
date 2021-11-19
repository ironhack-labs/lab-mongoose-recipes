const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(self => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })

const nuevaReceta = {
    title: "Rancher Eggs",
    level: "Beginner Cook",
    ingredients: ["4 eggs",
        "1 Onion",
        "3 Chilies",
        "3 Tomatos",
        "1 Spoon with a pinch of salt",
        "1 Garlic clove",
        "3-4 Tortillas",
        "Cooking oil"
    ],
    cuisine: "Mexican",
    dishType: "Breakfast",
    image: "https://www.guacamouly.com/wp-content/uploads/2021/05/Huevos-rancheros-750x394.jpg.webp",
    duration: 30,
    creator: "Cook Miguel",
    created: "19-11-21",
}

const createMultipleRecipes = async() => {
    try {
        const recipes = await Recipe.insertMany(data)
        console.log(recipes.title)
    } catch (error) {
        console.log('Error connecting to the database', error)
    }
}

then(() => {
        // Run your code here, after you have insured that the connection was made
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });