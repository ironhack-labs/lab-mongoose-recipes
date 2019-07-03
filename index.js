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

//CREATE ONE SINGLE RECIPE
Recipe.create(data[0])
.then((recipe)=>{ console.log('Recipe created', recipe); })
.catch((error)=>{ console.log('Error:', error); });

//CREATE MANY RECIPES
Recipe.insertMany(data)
.then((data)=>{ console.log(data); })
.catch((err)=>{ console.log(err) });

////UPDATE ONE RECIPE
Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then((recipe)=>{ console.log(recipe); })
.catch((error)=>{ console.log(error); });

//DELETE ONE RECIPE
Recipe.deleteOne({title: 'Carrot Cake'})
.then( (recipe)=>{ console.log(recipe); })
.catch( (error)=>{ console.log(error); });

