const mongoose = require('mongoose');
require('./config/db.config');

const Recipe = require('./models/Recipe.model');
const AllRecipes = require('./data.json');


mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
  .then(() => console.log('Database has been cleared'))
  .then(() => Recipe.create(AllRecipes))
  .then((recipes) => {
    for (let i = 0; i < AllRecipes.length; i++) {
      console.log(recipes[i].title)
    }
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())
})


/* Recipe.create(AllRecipes)
  .then(createdRecipes => console.log(createdRecipes[0].title))
  .catch(err => console.log(err)) */

