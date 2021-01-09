const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const recipe = new Recipe({
    title: 'Mac & cheese',
    ingredients: ['mac', 'cheese'],
    cuisine: ['American'],
    dishType: 'main_course',
    image: 'https://www.hola.com/imagenes/cocina/recetas/20200617170335/mac-and-cheese/0-837-58/mac-cheese-adobe-m.jpg',
    duration: 30,
    creator: 'Renzo'
});

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


        Recipe.create({
            title: 'Mac & cheese',
            ingredients: ['mac', 'cheese'],
            cuisine: 'American',
            dishType: 'main_course',
            image: 'https://www.hola.com/imagenes/cocina/recetas/20200617170335/mac-and-cheese/0-837-58/mac-cheese-adobe-m.jpg',
            duration: 30,
            creator: 'Renzo'
        }).then(recipe => {
            console.log('recipe ' + recipe.title + ' created!');
        }).catch(err => {
            console.log(err);
        });

        Recipe.insertMany(data).then(recipes => {

            recipes.forEach(recipe => {
                console.log('recipe ' + recipe.title + ' inserted!');
            });

            // iteration 4
            //const query = { title: 'Rigatoni alla Genovese' };
            Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
                .then(recipe => {

                    if (recipe) {
                        console.log('recipe ' + recipe.title + ' duration : ' + recipe.duration + ' updated!');
                    } else {
                        console.log('recipe not found');
                    }

                }).catch(err => {
                    console.log(err);
                });

            // iteration 5
            Recipe.deleteOne({ title: 'Carrot Cake' })
                .then(recipe => {

                    if (recipe) {
                        console.log('recipe ' + recipe.title + ' deleted!');
                    } else {
                        console.log('recipe not found');
                    }

                }).catch(err => {
                    console.log(err);
                });

            // iteration 6
            mongoose.disconnect();

        }).catch(err => {
            console.log(err);
        });
    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });