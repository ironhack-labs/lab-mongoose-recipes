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

  // let bananaPancakes ={ 
  // title: 'bananaPancakes',
  // ingredients: ['bananas', 'pancakes'],
  // }

  // let recipe = new Recipe(bananaPancakes)

  // let spaget = {
  //   title: 'spaget',
  //   ingredients: 'noods'
  // }
  // // Spaget
  // Recipe.create(spaget, function (err, recipe) {
  //   if (err) {
  //       console.log('An error happened:', err);
  //   } else {
  //       console.log('The recipe is saved and its value is: ', recipe);
  //   }
  // }); 
  // Recipe.create(bananaPancakes)
  /////
// Array of foods
//   Recipe.insertMany(data, function (err, recipe) {
//   if (err) {
//     console.log('An error happened:', err);
// } else {
//     console.log('The recipe is saved and its value is: ', recipe);
// }
// });
  
//   for(let i= 0; i<data.length; i++){
//   console.log(data[i].title)
//   }

//   Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
//     .then('succ')
//     .catch('err')
   

    // Recipe.deleteOne({title: 'Carrot Cake'})
    // .then('succ')
    // .catch('err')

  




