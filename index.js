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
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Pumpkin Soup',
      level: 'Easy Peasy',
      ingredients: 'Pumpkin, potatoes, onion, garlic, coconut milk',
      cuisine: 'Western',
      dishType: 'soup',
      duration: 45,
      creator: 'Michelle'
    }).then(book => {
      console.log(book.title + ' has been added to the recipe list.')

      Recipe.insertMany(data)
      .then((recipes) => {
        console.log('The following recipes have been added:')
        recipes.forEach(recipe => console.log(recipe.title))
        })
      .catch(error => {
        console.error('Error connecting to the database', error);
      })
      .then (() => {
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100}, { new: true})
        .then((recipe) => {
          console.log(recipe.title + ' has been updated.');
          Recipe.deleteOne({ title: 'Carrot Cake'}, () => console.log('An item has been deleted.'))
          .then(() => {
            mongoose.connection.close();
          })
        })
      })
      .catch(error => {
        console.error('Error while updating/adding items', error);
      });
    })
    .catch(error => {
      console.error('Error connecting to the database', error);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


