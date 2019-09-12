const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');

    Recipe.findOne({ title: 'Rigatoni alla Genovese' })
      .then(recipe => {
        console.log(recipe)
        recipe.duration = 100;
        recipe.save((err, doc) => {
          console.log('save', err, doc)
        })
        console.log(`You updated ${recipe.title} to ${recipe.duration}!`);
      })
      .catch(function (err) {
        console.log(err)
      });

  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

let recipe1 = new Recipe(data);
Recipe.create(recipe1).then(recipe => {
  Recipe.create(recipe);
  console.log("----", recipe);
})

Recipe.insertMany(data)
  .then (recipe => {
    for (let i = 0; i < data.length; i++) {
      recipe = new Recipe(data[i]);
      console.log("===>",recipe);
      Recipe.create(recipe);
    }
  })
.catch(function(err) {
  console.log(err)
});

Recipe.deleteOne({ name: 'Carrot Cake' }, function (err) {
  console.log("Removed")
});

// var query = { title: 'Carrot Cake' };
// var update = { duration: 100000 };
// Recipe.findOneAndUpdate(query, update, function(err,doc){
//   console.log(err,doc)
// })
// Recipe.findOneAndUpdate(query, update, function(err,doc){
//   console.log(err,doc)
// })
// Recipe.findOneAndUpdate(query, update)
// .then(recipe => {
//   console.log(recipe)
//   console.log(`===You updated ${recipe.title} to ${recipe.duration}!`);
// })
// .catch(function(err) {
//   console.log(err)
// });