const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const data = require('./data.js');

const Recipe = require('./models/Recipe.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

function createOneRecipe() {
  Recipe.create({
    title: 'Bolo',
    level: 'Easy Peasy',
    ingredients: 'massa',
    cuisine: 'sim',
    dishType: 'Breakfast',
    duration: 10,
    creator: 'Matheus'
  })
    .then((recipe) => {
      console.log('Recipe criado!', recipe);
      // closeConnection();
    })
    .catch((err) => {
      console.log('Erro o criar Recipe!', err);
    });
}

function insertManyRecipe() {
  Recipe.insertMany(data)
    .then((recipe) => {
      console.log('Vários Recipes criado!', recipe);
      closeConnection();
    })
    .catch((err) => {
      console.log('Erro o criar Recipes!', err);
    });
}

function updateOneRecipe() {
  Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
    .then((recipe) => {
      console.log('Recipe Update!', recipe);
      closeConnection();
    })
    .catch((err) => {
      console.log('Erro dar update user!', err);
    });
}

function deleteOneRecipe() {
  Recipe.deleteOne({ title: 'Carrot Cake' })
    .then((recipe) => {
      console.log('Recipe Delete!', recipe);
      closeConnection();
    })
    .catch((err) => {
      console.log('Erro dar delete user!', err);
    });
}

function closeConnection() {
  mongoose.connection.close(() => {
  })
}

mongoose.connection.on('connected', () => {
  console.log(('Mongoose default connection open'));

  createOneRecipe();
  // insertManyRecipe();
  // updateOneRecipe();
  // deleteOneRecipe();
});