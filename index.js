const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

function newOneRecipe() {
  Recipe.create({
    title: 'Silpancho',
    level: 'UltraPro Chef',
    ingredients: [
      '4 cups water',
      '2 cups white rice',
      '6 potatoes, peeled',
      '1/2 cup vegetable oil, divided',
      '6 eggs',
    ],
    cuisine: 'From Bolivia',
    dishType: 'Dish',
    duration: 70,
    creator: 'Roberto Camacho',
  })
    .then((Recipe) => {
      console.log('Title of one recipe: ', Recipe.title);
    })
    .catch((err) => {
      console.log('An error happened:', err);
    });
}

function insertManyRecipes(allRecipes) {
  Recipe.insertMany(allRecipes)
    .then((allRecipes) => {
      allRecipes.forEach(oneRecipe => console.log('Title of recipe: ', oneRecipe.title));
    })
    .catch((err) => {
      console.log('An error happened:', err);
    });
}

function updateRecipeTime(titleOfRecipe, time) {
  Recipe.updateOne({ title: titleOfRecipe }, { duration: time })
    .then(() => {
      console.log(titleOfRecipe, '- Successfully Updated!!!');
    })
    .catch((err) => {
      console.log('An error happened:', err);
    });
}

function removeRecipe(titleOfRecipe) {
  Recipe.deleteOne({ title: titleOfRecipe })
    .then(() => {
      console.log(titleOfRecipe, '- Successfully Removed!!!');
    })
    .catch((err) => {
      console.log('An error happened:', err);
    });
}

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

newOneRecipe();
insertManyRecipes(data);
updateRecipeTime('Rigatoni alla Genovese', 100);
removeRecipe('Carrot Cake');
