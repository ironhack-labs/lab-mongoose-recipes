const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({ title: 'Brigadeiro', level: 'Easy Peasy', ingredients: ['400 g (14 oz) sweetened condensed milk', '2 tablespoons butter, plus more for greasing', '40 g (⅓ cup) cocoa powder', 'chocolate sprinkles, to decorate' ], cuisine: 'Brasilian', dishType: 'Dessert', duration: 15, creator: 'Mariazinha', created: Date('1939-05-26') })
 .then(Recipe => { console.log('The user is saved and its value is: ', Recipe) })
  .catch(err => { console.log('An error happened:', err) });

Recipe.insertMany(data)
  .then(Recipe => { console.log('The user is saved and its value is: ', Recipe) })
  .catch(err => { console.log('An error happened:', err) });

Recipe.updateOne({ title: 'Rigatoni alla Genovese'}, { duration: 100 })
  .then(Recipe => { console.log('Update conclude ', Recipe) })
  .catch(err => { console.log('An error happened', err) });

Recipe.deleteOne({ title: "Carrot Cake"})
  .then(recipe => { console.log('The recipe was deleted') });
  .catch(err => { console.log('An error happened:', err) });