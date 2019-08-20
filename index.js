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

  //interation: 2
  Recipe.create({ 
    title: 'Homemade Mangu',
    level: 'Amateur Chef',
    ingredients: ['2 Tablespoons of Vinegar', 'Salt & Pepper', '4 Tablespoons Butter', '2 Pantains', 'Onion'],
    cuisine: 'Dominican',
    dishType: 'Dish',
    duration: 30,
    creator: 'Chef Joes',
    created: '11/02/1993',
  })
  .then(recipe => { console.log('The new recipe is: ', recipe)})
  .catch(err => { console.log('An error happened: ', err)})

//Interation: 3
Recipe.insertMany(data)
.then(newRecipe =>{
  console.log(`Recipes has been added to DB: ${newRecipe}`);
  newRecipe.forEach(({title}) =>console.log(`Title is ${title}`));})
.catch(err => { console.log('An error happened: ', err)});

//Interation: 4
Recipe.updateOne({title: 'Carrot Cake'}, {cuisine: 'French'})
.then(updateRecipe => {
  console.log('Carrot Cake has been updated!') })
.catch(err =>{
  console.log( 'An error has occur', err);
});

//Interation: 5
Recipe.deleteOne({title: 'Chocolate Chip Cookies'})
      .then(recipe => { console.log( 'The recipe "Chocolate Chip Cookies" has been deleted successfully')})
      .catch(err => { console.log( 'An error has occur', err)})

//Interation: 6
process.on('SIGINT', () => { 
  mongoose.connection.close(() => { 
    console.log('Mongoose is Disconnected'); 
    process.exit(0); 
  }); 
}); 