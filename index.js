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



const newRecipe = Recipe({
  title: 'Chocolate Chip Cookies',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
  cuisine: 'French',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 30,
  creator: 'Chef Jennifer'
});

let create = Recipe.create(newRecipe);

let insert = Recipe.insertMany(data)
  .then(recipe => { console.log('Recipe created: ', recipe) })
  .catch(error => { console.log('An error happened:', error) });

let update = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  .then(recipe => { console.log('Rigatoni duration updated', recipe) })
  .catch(error => { console.log('An error happened:', error) });

let del = Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(recipe => { console.log('Carrot Cake removed', recipe) })
  .catch(error => { console.log('An error happened:', error) });


Promise.all([create, insert, update, del])
  .then(() => {
    console.log('All promisses worked well.');
    mongoose.connection.close();
})
.catch(error => { console.log('An error happened:', error) });