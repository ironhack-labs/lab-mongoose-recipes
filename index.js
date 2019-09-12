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

  let bananaPancakes = {
    title: 'Banana Pancakes',
    ingredients: ['bananas', 'flour', 'sugar', 'eggs']
  }

// let howToBanana = new Recipe(bananaPancakes)

// howToBanana.save();

// Recipe.create(bananaPancakes).then(console.log(bananaPancakes.title));

// Recipe.insertMany(data).then(data => {
//   data.forEach(meal => {
//    console.log(meal.title)
//  });
// }).catch(err => {
//   console.log({err: err});
//   throw err;
// })

// let target = {duration: 220};

// Recipe.findOneAndUpdate(target, {duration: 100}).then(console.log('success')).catch(err=> {
//   console.log({err:err});
//   throw err;
// })

// let deleteTarget = {title:'Carrot Cake'};

// Recipe.deleteOne(deleteTarget).then(
//   console.log(`success`)
// ).catch(err => {
//   console.log({err:err});
//   throw err;
// })

mongoose.disconnect().then(
  console.log(`database disconnected`)
)