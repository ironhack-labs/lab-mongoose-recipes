const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(result => {
//   console.log('Success');
// });

// Recipe.deleteOne({ title: 'Carrot Cake' }).then(result => {
//   console.log('Success');
// });

// Recipe.create({
//   title: 'Burger',
//   level: 'Easy Peasy',
//   ingredients: ['Bun', 'Beef'],
//   cuisine: 'American',
//   dishtype: 'Dish',
//   duration: 10,
// })
//   .then(result => {
//     console.log(result.title);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// Recipe.insertMany(data)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(err => {
//     console.log(err);
//   });
