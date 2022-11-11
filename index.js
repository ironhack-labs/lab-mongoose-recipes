const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
    .connect(MONGODB_URI)
    .then((x) => {
        console.log(`Connected to the database: "${x.connection.name}"`);
        // Before adding any recipes to the database, let's remove all existing ones
        return Recipe.deleteMany();
    })
    .then(() => {
        // Run your code here, after you have insured that the connection was made
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

// Recipe.create({
//     title: 'tacos',
//     ingredients: ['carne', 'tortilla'],
//     cuisine: 'mexicana',
//     image: 'no image jeje',
// }).then((info) => console.log(`successfully created`, info));

const executeTaskInOrder = async () => {
    try {
        const insertMany = await Recipe.insertMany([...data]);
        insertMany.forEach((recipe) => console.log(recipe.title));

        await Recipe.findOneAndUpdate(
            { title: 'Rigatoni alla Genovese' },
            { duration: 100 }
        );
        console.log('Successfully updated rigatoni');

        await Recipe.deleteOne({ title: 'Carrot Cake' });
        console.log('Successfully deleted Carrot Cake');

        mongoose.disconnect();
    } catch (err) {
        console.log('Something went wrong: ', err);
    }
};

executeTaskInOrder();
