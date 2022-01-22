const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

require('./config/db.config.js')

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  .then(() => {
    return Recipe.create(data)
  })
  .then(recipe => {
    recipe.forEach(element => {
      console.log(element.title)
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate({name: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
  })
  .then(result => {
    console.log(`${result.title} was correctly updated`);

    return Recipe.deleteOne({name: "Carrot Cake"});
  })
  .then(result => {
    console.log(`${result.deletedCount} item has been deleted`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => mongoose.connection.close());
})
