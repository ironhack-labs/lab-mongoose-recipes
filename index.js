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
  title: 'Pizza Tropical',
  level: 'Easy Peasy',
  ingredients: ['Flour', 'Water', 'Tomatoe', 'Cheese', 'Pineapple'],
  cuisine: 'Italian',
  dishType: 'Dish',
  image: 'https://cocina-casera.com/wp-content/uploads/2017/12/pizza-tropical.jpg',
  duration: 30,
  creator: 'Chef Franfredo',
   
}).then(recipeCreated => {
  console.log(recipeCreated.title)
})

Recipe.insertMany(data)
  .then(recipes => recipes.forEach(recipe => console.log(recipe.title)))
  .then(() => Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true}))
  .then(() => console.log("Duration modified"))
  .then(() => Recipe.deleteOne({title: 'Carrot Cake'}))
  .then(() => console.log('Recipe removed'))
  .then(() => mongoose.disconnect());

