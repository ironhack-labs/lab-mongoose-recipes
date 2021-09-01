const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    Recipe

    // ITERATION 2
    //   .create(
    //     {title: 'tiramisu', cuisine: 'italian'}
    //   )
    //   .then(recipe => {console.log(recipe.title)})
    //   .catch((err) => {console.log('there has been an error!', err)})

      .create(data)
      .then(recipes => {
        recipes.forEach(getTitle => console.log(getTitle.title))
        Recipe
          .deleteOne({title: 'Carrot Cake'})
          .then(info => console.log(info))
          .catch(err => console.log(err))
        Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
          .then(recipes => {
            console.log('Successfully updated', recipes)
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()
