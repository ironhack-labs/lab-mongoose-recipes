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

Recipe.create({
  title: 'Licor café',
  level: 'UltraPro Chef',
  ingredients: ['liquor', 'coffee'],
  cuisine: 'Galician',
  dishType: 'Drink',
  image: 'https://t1.uc.ltmcdn.com/images/8/4/6/img_como_hacer_licor_cafe_6648_600.jpg',
  duration: 120,
  creator: 'Chef Brais'
})
.then(recipeCreated => Recipe.insertMany(data))
.then(dataAdded => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, {
  duration: 100
})
.then(updatedRecipe => { console.log('Successfully updated recipe!')}));

