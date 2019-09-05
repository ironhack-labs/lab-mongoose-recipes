const mongoose = require('mongoose');

const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
const DATABASE_NAME = 'recipeApp';
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
   // createRecipe();
   // insertArray();
   // changeDuration();
    remove();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  function createRecipe() {
    const recipe = new Recipe ()
    Recipe.create({
      title: 'Cake',
      cuisine: 'American'
    })

    .then(recipe => {
      console.log('Recipe cake here')
      console.log(recipe)
    })

    .catch(error => {
      console.log('error with recipe')
    })
  }

  function insertArray(){
    Recipe.insertMany(data)
    data.map(item => {
      console.log(item.title)
    })
  };

  function changeDuration() {
    Recipe.findById('5d7148de36f8f607408cb5dd')
    .then(recipe => {
      console.log('Found recipe')
      console.log(recipe);

      recipe.duration = 100;
      recipe.save()
        .then(() => {
          console.log('recipe succesfully changed')

        })

        .catch(() => {
          console.log('Error')
        })
    })
  }
  
  function remove() {
    Recipe.findByIdAndDelete('5d714921538b590fc420bf55')
    .then(recipe => {
      console.log('Removed Carrots')
      console.log(recipe);

      recipe.save()
        .then(() => {
          console.log('recipe succesfully removed')

        })

        .catch(() => {
          console.log('Error')
        })
    })
  }