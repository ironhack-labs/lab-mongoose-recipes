const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });
  Recipe.create({ 
    title: 'Cocido',
    level: 'Amateur Chef',
    ingredients: [ '9 oz dried chickpeas', ' 1 lb cured brisket of beef', ' 9 oz salt pork belly', '1 lb 4 oz knuckle gammon bone', ' 1 1/2 lb beef marrow bone', '1/2 boiling chicken', ' 1 pig\'s trotter', '2 bay leaves', ' 1 1/2 lb cabbage', ' 2 carrots', ' 2 leeks', '1 lb new potatoes', ' 2 chorizos', ' 1 morcilla'],
    cuisine: 'Spanish',
    dishType: 'Dish',   
    image: 'https://www.spain-recipes.com/images/cocido.jpg',
    duration: 180,   
    creator: 'Mom',
   })
  .then(recipe => { console.log('The recipie is saved and its name is: ',recipe.title) })
  .catch(err => { console.log('An error happened:', err) });

  Recipe.insertMany(data)
  .then(recipes => { console.log('The recipies are saved and its name are: ',recipes) })
  .catch(err => { console.log('An error happened:', err) });

  Recipe.updateOne(
    {title: 'Rigatoni alla Genovese'},
    {duration: 100}
  )
  .then(recipe => { console.log('The recipie',recipe.title,'has been updated')})
  .catch(err => { console.log('An error happened:', err) });

  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(recipe => { console.log('The recipe has been removed') })
  .catch(err => { console.log('An error happened:', err) });

  process.on('SIGINT', () => {  
    mongoose.connection.close(() => { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 