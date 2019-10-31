const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
// const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const recipeModel = require('./models');

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  app.get('/', (request, response) => {
    // receipeModel.create({ title: 'Arroz', ingredients: ['alho', 'cebola', 'sal', 'pinhao']})
    recipeModel.insertMany(data)
    .then((recipe) => { 
        response.send(recipe);
    })
    .catch(err => { response.send('An error happened:' + err) });
});

app.listen(PORT, (error) => {
    if(error) {
        return console.log(error);
    }
    console.log(`App rodando na porta ${PORT}`);
});