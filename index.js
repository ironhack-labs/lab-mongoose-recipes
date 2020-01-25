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
    title: 'Goulash',
    level: 'UltraPro Chef',
    ingredients: ['3 1/2 pounds boneless beef, cut into small pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 teaspoons ground cumin', '1/4 teaspoon cayenne pepper'],
    cuisine: 'Hungarian',
    dishType: 'Dish',
    image: 'https://kuchynalidla.sk/img/SK/653x414/20190710064142-10263%2011592%20-%20lidl%20Kuchyna%20KW29%20OBRAZOK%20HLAVNY%20RECEPT%20653x414.jpg',
    duration: 240,
    creator: 'Chef Michaela'
});

.then(() => console.log("Recipe succesfully created!")
.catch(console.log("Error"))

