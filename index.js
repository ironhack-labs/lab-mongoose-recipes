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
  title: 'Impecable Salmon',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup light brown sugar', '1 large egg', '2 tablespoons milk', '1 1/4 teaspoons vanilla extract', '2 cups semisweet chocolate chips'],
        cuisine: 'French',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 60,
        creator: 'Horace Lee'
})
.then(user => { console.log(`The Recipe was created succesfully`)})
.catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
.then(user => { console.log("The Recipes were included succesfully")})
.catch(err => { console.log('An error happened:', err) });

Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then(user => { console.log("The Recipe was modified succesfully")})
.catch(err => { console.log('An error happened:', err) });

Recipe.deleteOne({title: 'Carrot Cake' })
.then(user => { console.log(`The Carrot Cake was modified succesfully`)})
.catch(err => { console.log('An error happened:', err) });