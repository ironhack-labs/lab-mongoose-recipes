const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/RecipeSchema');


mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    return Recipe.collection.drop()
      .then(() => Recipe.insertMany(data)
        .then(recipe => recipe.forEach(elem => console.log('The recipe is created and it is: ', elem.title)))
        .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
          .then(() => console.log('Duration of Rigatoni updated'))
          .then(() => Recipe.deleteOne({ title: 'Carrot Cake' })
            .then(() => console.log('Carrot Cake removed'))))
        .catch(err => console.log('An error happened: ', err)))
      .catch((err) => {
        console.error('Error connecting to mongo', err);
      });
  });
