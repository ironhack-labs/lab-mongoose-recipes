const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then(x => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany()
    })
    .then(() => Recipe.syncIndexes())
    .then(() => {
        Recipe
            .create({
                title: "spaguetis boloñesa",
                level: "UltraPro Chef",
                ingredients: [
                    "spaguetis", "carne"
                ],
                cuisine: "American",
                dishType: "main_course",
                image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
                duration: 160,
                creator: "Chef pablo"
            }, )
            .then(newRecipe => console.log('la nueva receta es:', newRecipe))
            .catch(error => console.log('Hubo un error:', error))
    })
    .then(() => {
        Recipe
            .insertMany(data)
            .then(newRecipe => newRecipe.forEach(elm => console.log(`la nueva receta es:", ${elm.title}`)))
            .catch(error => console.log('Hubo un error:', error))
            .then(() => {
                Recipe
                    .findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
                    .then((newRecipe => console.log(`los detalles de modificacion son ${newRecipe}`)))
                    .catch(error => console.log('Hubo un error:', error))

            })
            .then(() => {
                Recipe
                    .deleteOne({ title: "Carrot Cake" })
                    .then((newRecipe => console.log(`los detalles de modificacion son ${newRecipe}`)))
                    .catch(error => console.log('Hubo un error:', error))
            })
            .then(() =>
                mongoose.disconnect()
            )
    })
    //Rigatoni alla Genovese duration to 100

.catch(error => {
    console.error('Error connecting to the database', error);
});