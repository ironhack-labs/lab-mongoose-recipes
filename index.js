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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany([{title: 'mapo tofu', cuisine: 'taiwanese'}, {title: 'Nudeln mit Tomatensoße', cuisine: 'deutsch'}, {title: 'Rigatoni alla Genovese', cuisine: 'italian', duration: 20}, {title: 'carrot cake', cuisine: 'lebanese'}])
    .then(recipeFromDB => {
      console.log('title of recipe: ', recipeFromDB)
    })
    .then(() => {
      const promise1 = Recipe.updateOne({ duration: 20 }, { duration: 100 })
      .then(result => {
        console.log('it is updated!', result);
      })
      .catch(err => {
        console.log(err);
      });
      const promise2 = Recipe.deleteOne({title: 'carrot cake' })
        .then(result => {
          console.log('it is removed!', result);
        });
      // Promise.all([promise1, promise2])
      //   .then (() => {
      //     mongoose.connection.close();
      //   })

      return Promise.all([promise1, promise2])
    })
    .then(() => {
      mongoose.connection.close();
    })
    .catch(err => {
          console.log('error', err);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



