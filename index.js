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
  title: 'Asian Sweet Noodles',
  level: 'UltraPro Chef',
  ingredients: ['1 cup rice vinegar', '3 tablespoons honey', '1/4 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: 'Dish',
  duration: 60,
  creator: 'Chef LeChun'
})
  .then(res => console.log(res.title))
  .catch(err => console.log(err));


const updateDuration = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(() => console.log('Update Successful!'))
  .catch(err => console.log(err));

const deleteCarrot = Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => console.log('Remove Successful!'))
  .catch(err => console.log(err));


Recipe.insertMany(data)
  .then((dishes) => {
    dishes.forEach(dish => console.log(dish.title));
    Promise.all([updateDuration, deleteCarrot])
      .then(() => {
        mongoose.connection.close(() => console.log('Connection closed! See ya!'));
      })
      .catch(err => console.log(err));
  })
  .catch((dishes) => {
    dishes.forEach(err => console.log(err));
  });

