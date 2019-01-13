const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/recipes.model');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


Recipe.create({ 
  title: 'Tartaletas',
  level: "Easy Peasy",
  ingredients: ["eggs","water","sugar","salt", "chocolate", "kandyapple", "cookies", "cream"],
  cuisine: "American",
  dishType: "Dessert",
  image: "https://www.mycookrecetas.com/wp-content/uploads/2014/08/Tartaletas-de-lemon-curd-y-merengue.jpg",
  duration: 50,
  creator: "Carlos",
})
  .then(recipe => { console.log('The recipe is saved and is: ', recipe.title) })
  .catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
.then(recipe => { console.log('The recipes has been saved') })
.catch(err => { console.log('An error happened:', err) });

Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
.then(recipe => { console.log('The recipe update and is: Rigatoni alla Genovese') })
.catch(err => { console.log('An error happened:', err) });

Recipe.deleteOne({ title: "Carrot Cake"})
.then(recipe => { console.log('The recipe remove') })
.catch(err => { console.log('An error happened:', err) });


process.on('SIGINT', () => {  
  mongoose.connection.close(() => { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}) 