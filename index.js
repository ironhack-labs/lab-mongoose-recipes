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
        // Run your code here, after you have insured that the connection was made

        Recipe.insertMany(data)
            .then(result => {
                Recipe.findOneAndUpdate({ 'title': 'Rigatoni alla Genovese' }, { 'level': "Amateur Chef" }, )
                    .then(result => console.log('Recipe updated'))
                    .catch(err => console.log(err));
                Recipe.deleteOne({ title: 'Carrot Cake' })
                    .then(result => console.log('Recipe deleted'))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        const recipe = {
            title: 'Strogonnof',
            level: 'Easy Peasy',
            ingredients: ['chicken', 'milk cream', 'mostard', 'ketchup'],
            cuisine: 'Brasileira',
            dishType: 'main_course',
            duration: '30 min',
            creator: 'Renan',
        }
        return Recipe.create(recipe).then((res) => {
                console.log(res.title);
            })
            .catch(error => {
                console.error('Erro na criação da receita', error)
            })


    })
    .catch(error => {
        console.error('Error connecting to the database', error);
    });
mongoose.disconnect().then((res) => {
    console.log('db is closed')
})