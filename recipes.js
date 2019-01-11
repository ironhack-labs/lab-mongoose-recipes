const mongoose = require('mongoose');
require('./config/db.config');

const data = require('./data.js');
const Recipe = require('./models/recipe.model');

//Iteration 2:
Recipe.create({ 
  title: 'Tuna poke',
  level: 'Easy Peasy',
  ingredients: ['tuna', 'sesame oil', 'rice', 'avocado', 'onion', 'nori seaweed'],
  cuisine: 'Mediterranean',
  dishType: 'Dish',
  duration: 15,
  creator: 'Vero'
})
  .then(recipe => { console.log('The recipe is saved and its title is: ', recipe.title) })
  .catch(err => { console.log('An error happened:', err) });

//Iteration 3:
Recipe.insertMany(data)
  .then(data => { 
    console.log('All the recipes are saved and its titles are:');
    return data;
  })
  .then(data => { data.forEach((elem) => { console.log(elem.title)})})
  .catch(err => { console.log('An error has happened:', err)});

//Iteration 4:
Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => { console.log('Recipe successfully updated!')})
  .catch(err => { console.log('An error has happened:', err)});

//Iteration 5:
Recipe.deleteOne({title: 'Carrot Cake'})
.then(() => { console.log('Recipe successfully deleted!')})
.catch(err => { console.log('An error has happened:', err)});

//Iteration 6:
process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose disconnected!'); 
    process.exit(0); 
  }); 
}); 





