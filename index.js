const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(self => {
        console.log(`Connected to the database: "${self.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => Recipe.syncIndexes())
    .then(() => Recipe.create({ title: "papas arrugás", cuisine: "Canaria" }))
    .then((recipesReturned) => console.log("wow que receta chula, es:", recipesReturned.title))
    .then(() => Recipe.create(data))
    .then((recipesCreated) => recipesCreated.forEach(eachRecipe => console.log("mira mis recetitas, atent@, me presento, soy : ", eachRecipe.title)))
    .then(() => Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true }))
    .then((updatedRecipe) => console.log("Succes, has updateado la receta :", updatedRecipe.title))
    .then(() => Recipe.deleteOne({ title: "Carrot Cake" }, {new: true}))
    .then((deletedRecipe) => console.log("Comilón, te comiste el Carrot Cake"))
    .then(() => mongoose.connection.close())
    .catch(error => console.error('Error connecting to the database', error));

// Model 


