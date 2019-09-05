const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"



mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
    //newRecipe();
    insertRecipies();
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


  function newRecipe() {

    const recipe = new Recipe({
      title:'Tomato Soup',
      level: 'Amateur Chef',
      ingredients: ['Onions', 'Tomato', 'Garlic', 'Carrots'],
      cuisine: 'Portuguese',
      dishType: 'Dish',
      image: 'none',
      duration: 20,
      creator: 'Benedita Teles'
    })

    recipe.save()
        .then (() =>{
            console.log ('recipe has been saved')
            Recipe.find()
            .then(recipe => {
                console.log('Loaded all of the recipies');
                console.log (recipe);
            })
            .catch (error => {
                console.log ('Error loadins recipies')
            })
        })
        .catch (error => {
            console.log ('there was an error')
        })
    
}

function insertRecipies () {
//Recipe.deleteMany({}).then()
  Recipe.insertMany(data) 
  .then(recipe => {
    console.log(recipe)
  })
  .catch(err => {
    console.error('Error downloading data',err);
  }); 
}

