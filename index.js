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
        // Before adding any documents to the database, let's delete all previous entries
        return self.connection.dropDatabase();
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
        doTheLab();
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });



const myRecipe = {
    "title": "myRecipe",
    "level": "Amateur Chef",
    "ingredients": [
        "1 large egg",
    ],
    "cuisine": "French",
    "dishType": "dessert",
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
    "duration": 30,
    "creator": "Vproum"
}


async function doTheLab() {
    //iteration 2
    const ite2 = await Recipe.create(myRecipe);
    console.log("ite2 : ", ite2.title);

    //iteration 3
    const ite3 = await Recipe.insertMany(data);
    for (let recipe of ite3) {
        console.log("ite3 : ", recipe.title);
    }
}