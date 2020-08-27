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
    .then(() => {
        // Run your code here, after you have insured that the connection was made
        //Iteration 2
        Recipe.create({
                title: "Oatmeal",
                level: "Easy Peasy",
                ingredients: ['oats', 'milk', 'salt'],
                cuisine: 'International',
                dishType: 'breakfast',
                image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Oatmeal.jpg',
                duration: 10,
                creator: 'Adriano'
            })
            .then((nuevaReceta) => console.log(`${nuevaReceta.title}`))
    })
    .then(() => {
        Recipe.insertMany(data)
            .then((recipes) => {
                recipes.forEach((recipe) => {
                    console.log(`${recipe.title}`)
                })
            })
    })
    .then(() => {
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { useFindAndModify: false })
            .then(() => {
                console.log('Updated with sucess!')
            })
    })
    .then(() => {
        Recipe.findOneAndDelete({ title: 'Carrot Cake' })
            .then(() => {
                console.log('Recipe deleted')
            })
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    });