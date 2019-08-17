const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const brazilianJapaneseCurry = {
  title: 'Brazilian-Japanese Curry',
  level: 'Amateur Chef',
  ingredients: ['Japanese style rice', 'Carrots', 'Potatoes', 'Meat', 'Japanese Curry Sauce'],
  cuisine: 'Asian',
  dishType: 'Dish',
  duration: 30,
};

function createRecipe(recipeToCreate) {
  Recipe.create({
    title: recipeToCreate.title,
    level: recipeToCreate.level,
    ingredients: recipeToCreate.ingredients,
    cuisine: recipeToCreate.cuisine,
    dishType: recipeToCreate.dishType,
    duration: recipeToCreate.duration,
  })
    .then(recipe => { console.log(`Recipe created successfully! Title: ${recipe.title}`) })
    .catch(err => { console.log(`An error happened: ${err}`) });
}

function insertManyRecipes(array) {
  Recipe.insertMany(array)
    .then((recipes) => {
      recipes.forEach((recipe) => {
        console.log(recipe.title);
      });
    })
    .catch((err) => {
      console.log(`An error happened: ${err}`);
    });
}

function updateRecipeDuration(recipeToChange, newDuration) {
  Recipe.updateOne({ title: recipeToChange }, { duration: newDuration }, ((error, operationResult) => {
    if (error) return console.log('An error happened: ', error);
    return console.log('Recipe updated!', operationResult);
  }));
}

function deleteRecipe(recipeToDelete) {
  Recipe.deleteOne({ title: recipeToDelete }, ((error) => {
    if (error) return console.log('An error happened: ', error);
    return console.log('Recipe successfully deleted!');
  }));
}

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

createRecipe(brazilianJapaneseCurry);
insertManyRecipes(data);
updateRecipeDuration('Rigatoni alla Genovese', 100);
deleteRecipe('Carrot Cake');
