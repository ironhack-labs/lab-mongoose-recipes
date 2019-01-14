const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const Recipe = require('./models/recipes.model');

Recipe.create({
  title: "Gazpacho",
  level: "Easy Peasy",
  ingredients: ["tomate", "ajo", "pimiento","agua","pepino"],
  cuisine: "Española",
  dishType: "Dish",
  image: "https://estaticos.miarevista.es/uploads/images/recipe/59257de35cafe855f63c9869/gazpachoandaluz_0.jpg",
  duration: 30,
  creator: "roberto",
})
.then(recipe => { console.log('The recipe is saved: ', recipe.title);})
.catch(err => { console.log('An error happened:', err);});

Recipe.insertMany(data)
  .then(rec => { console.log('The recipes are saved!');
  return data;})
  .then(rec => { rec.forEach(rec => console.log(rec.title))})
  .catch(err => { console.log('An error happened:', err);});
  
Recipe.updateOne({ name: "Rigatoni alla Genovese"}, { duration: 100 })
.then(console.log('The recipe is updated!'))
.catch(err => { console.log('An error happened:', err);});

Recipe.deleteOne({ name: "Carrot Cake"})
  .then(console.log('The recipe is deleted!'))
  .catch(err => { console.log('An error happened:', err);});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 