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

//Interation 2
//   Recipe.create({title: 'Recipe di test',
//   level: 'Amateur Chef', 
//   ingredients: ['ing 1', 'ing 2','ing 3', 'ing 4','ing 5', 'ing 6','ing 7', 'ing 8'],
//   cuisine: 'Italian',
//   dishType: 'Breakfast',
//   duration: 30,
//   creator: 'Eu mesmo criei'
// })
//   .then((result) => { 
//       console.log('Only one recipe created.');
//  })
//   .catch(err => { console.log('An error happened:', err) });


//Interation 3
//   Recipe.create(data)
//   .then((result) => { 
//       console.log('Many recipies created.');
//  })
//   .catch(err => { console.log('An error happened:', err) });

// Interation 4
// // let query = { title: 'Rigatoni alla Genovese' };  other mode
// Recipe.findOneAndUpdate( {title: 'Rigatoni alla Genovese'}, { duration: 177700 })
//   .then((result) => {
//     console.log('Recipe updated.');
//   })
//   .catch(err => { console.log('An error happened:', err) });

  //Interation 5
  // Recipe.deleteOne( {title: 'Carrot Cake'})
  // .then((result) => {
  //   console.log('Recipe deleted.');
  // })
  // .catch(err => { console.log('An error happened:', err) });

  
//Interation 6
mongoose.connection.close(function () {
  console.log('Mongoose connection disconnected');
});
