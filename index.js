const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });


Recipe.create({
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'], 
  cuisine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg', 
  duration: 40,
  creator: 'Chef LePapu' },
  function (err, user) {
    if (err) {
        console.log('An error happened:', err);
    } else {
        console.log('The user is saved and its value is: ', user);
    }
  });

Recipe.insertMany(data, function(err, user) {
  if (err) {
    console.log('An error happened:', err);
} else {
    console.log('The user is saved and its value is: ', user);
}
});

Recipe.find({}, (err, Recipes) => {
  Recipes.forEach((e) => {
    console.log(e.title);
  })
});

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(console.log('Success!'))
  .catch(console.log('Fail!'));

Recipe.deleteOne({ title: 'Carrot Cake' }, function (err) {});

mongoose.connection.close();
