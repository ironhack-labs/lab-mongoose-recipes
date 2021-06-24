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
    .then(() => {
        // return Recipe.create(data);
        // We found out later that we were supposed to create a dish manually
        return Recipe.insertMany(data);
    })
    .then(() => {
        Recipe.find({})
            .then((result) => {
                result.forEach((dish) => {
                    console.log(dish.title)
                });
            })
    })
    .then(() => {
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
            .then((updatedDish) => {
                console.log("The dish is updated:", updatedDish)
            })
    })
    .then(() => {
        Recipe.deleteOne({ title: 'Carrot Cake' })
            .then((deleteData) => {
                console.log('Carrot Cake is deleted!', deleteData)
            })
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });
mongoose.connection.close();

// console.log(mongoose.connection.readyState);