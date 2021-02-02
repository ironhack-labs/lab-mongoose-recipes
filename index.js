require("dotenv").config();
const mongoose = require('mongoose');
const process = require("process");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
mongoose.connect("mongodb://localhost:27017/recipe-app")

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
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
        Recipe
            .create({
                title: 'Tacos al pastor',
                level: 'Amateur Chef',
                ingredients: ['tortillas de maíz', 'carne de cerdo',
                    'cebolla', 'ajo', 'chile huaque', 'chile pasa', 'comino',
                    'cilantro', 'piña',
                    'zumo de naranja', 'sal', 'pimienta', 'oregano'
                ],
                cuisine: 'Mexican',
                dishType: 'main_course',
                image: 'https: //unsplash.com/photos/z_PfaGzeN9E',
                duration: 60,
                creator: 'Chef Andrea',
                created: new Date(2021, 2, 1),
            })
    })
    .then((recipe) => {
        console.log(recipe.title)
    })
    .then(() => {
        Recipe
            .insertMany(data)
            .then((recipes) => {
                recipes.forEach(recipe => console.log(recipe.title))
            })
    })


.then(() => {
        Recipe
            .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
            .then(() => {
                console.log("Rigatoni alla Genovese were updated")
            })
    })
    .then(() => {
        Recipe
            .deleteOne({ title: "Carrot Cake" })
            .then(() => {
                console.log("You just deleted the Carrot Cake recipe")
            })
    })

.catch(error => {
    console.error('Error connecting to the database', error);
});
process.on("SIGINT", () => {
    mongoose.connection
        .close()
        .then(() => {})
        .catch((e) => {})
        .finally(() => {});
});