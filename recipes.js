const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');
const Recipe = require ('./models.js')
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
  title: 'Rigatoni alla Genovese',
  level: 'Easy Peasy',
  ingredients: ['2 pounds red onions, sliced salt to taste', '2 (16 ounce) boxes uncooked rigatoni', '1 tablespoon chopped fresh marjoram leaves', '1 pinch cayenne pepper', '2 tablespoons freshly grated Parmigiano-Reggiano cheese'],
  cuisine: 'Italian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/3489951.jpg',
  duration: 220,
  creator: 'Chef Luigi'
})
.then ( recipe => { console.log('Name recipie is',recipe.title)})
.catch (err => { console.log ('this is an error', err)})
