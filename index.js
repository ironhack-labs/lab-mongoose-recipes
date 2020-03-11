const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

//Crear una
  /*Recipe.create(data[0])
  .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
  .catch(err => { console.log('An error happened:', err)
});*/

// crear todas
/*Recipe.insertMany(data)
.then (data=> console.log(data))
.catch(err => console.log('An error happened:', err));*/
/*
Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration:'100'})
.then(console.log('Recipe changed'))
.catch(err => console.log('An error happened:', err));*/

Recipe.deleteOne({title:'Carrot Cake'})
.then (console.log('delete succes!'))
.catch(err => console.log('An error happened:', err));