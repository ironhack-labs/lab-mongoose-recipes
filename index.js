const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        // Run your code here, after you have insured that the connection was made
        const recipe = {
            title: 'crepe',
            level: 'Easy Peasy',
            ingredients: ['eggs', 'milk', 'floor'],
            cuisine: 'française',
            dishType: 'dessert',
            duration: 1,
        };

        Recipe.create(recipe)
            .then((createdDocument) => {
                console.log("Success !!");
                console.log(createdDocument.title);
            })
            .catch((error) => {
                console.log(error);
            });

        Recipe.insertMany(data)
            .then((recipes) => {
                recipes.forEach((item) => console.log(item.title));

                Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
                    .then((updatedDocument) => {
                        console.log("Updated document ====>", updatedDocument);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // DELETE
                Recipe.findOneAndDelete({ title: "Carote Cake" })
                    .then(() => {
                        console.log("Success!");

                        mongoose.connection.close();
                    })
            });

    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });