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

const recipe = new Recipe({
  title: 'Asian Glazed Chicken Thighs1',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
});

let promise = Recipe.create(recipe)
.then((recipe) => console.log(recipe.title))
.catch(err => console.log(err));

let promise2 = Recipe.insertMany(data)
.then((e) => {
  e.forEach((recipe) => console.log(recipe.title));
  
  Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  .then(() => console.log('updated'))
  .catch((err) => console.log(err));
  
  Recipe.deleteOne({title: 'Carrot Cake'})
  .then(() => console.log('deleted'))
  .catch((err) => console.log(err));
})
.catch(err => console.log(err));

Promise.all([promise, promise2]) 
.then(() => mongoose.connection.close(() => console.log('Disconnected')))
.catch((err) => console.log(err));


