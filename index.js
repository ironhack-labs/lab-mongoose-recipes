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
  .then(() => {
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration : 100}, {new: true})
  })
  .then(recipeUpdated => {
    console.log(`Recipe ${recipeUpdated.title} has been updated with duration ${recipeUpdated.duration}`)
  })
  .then(() => {
    return Recipe.findOneAndDelete({title: 'Carrot Cake'})
  })
  .then(recipeDeleted => {
    console.log(`Recipe ${recipeDeleted.title} is no longer available`)
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close())
})

