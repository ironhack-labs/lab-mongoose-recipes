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
    title: 'Chicken Soup',
    level: 'Easy Peasy',
    ingredients: ['Chicken', 'Water', 'Salt' ],
    cuisine: 'yee',
    dishType: 'Snack',
    image: 'https://images.media-allrecipes.com/images/75131.jpg',
    duration: 15,
    creator: 'Nate',

  }).then(recipe=> {console.log('The recipe is saved', recipe.title)})
  .catch(err=>{console.log('error happened', err)});

// console.log(data, '$%^&%^&*')

//Below is the commented out code that returns all of our data from the data.js to the Mongocompass
//Recipe.insertMany(data)

Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration:100})
  .then(whatverIwanted=>console.log(whatverIwanted))
  .catch(err=>console.error(err))

Recipe.deleteOne({title: "Carrot Cake"})
  .then(whatverIwanted=>console.log(whatverIwanted))
  .catch(err=>console.error(err))

  setTimeout(() => {
    mongoose.disconnect();
  }, 1500)