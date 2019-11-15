// Este es como se hace para asegurarnos que la conexion de database is closed.

const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true })
  .then(() => console.log('Connected to Mongo!'))
  .catch(err => console.error('Error connecting to mongo', err));

const newRecipe = {
  title: 'Paella',
  level: 'UltraPro Chef',
  ingredients: ['rice', 'safron', 'sea shells'],
  cuisine: 'Traditional',
  dishType: 'Dish',
  image: '',
  duration: 60,
  creator: 'Bob',
};

// Iteration 2

const pr1 = Recipe.create(newRecipe);

// Iteration 3

const pr2 = Recipe.insertMany(data);

Promise.all([pr1, pr2])
  .then(result => {
    console.log(result);
    disconnectFromMongo();
  })
  .catch(err => console.log(err));

function disconnectFromMongo() {
  mongoose.connection
    .close()
    .then(() => console.log('Disconnected from Mongo'));
}

// Iteration 4

// Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })

// Iteration 5

// Recipe.deleteOne({ title: 'Carrot Cake' })
