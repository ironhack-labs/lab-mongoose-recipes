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
    Recipe.create({
        title: 'recipe1',
        cuisine: "Asian"
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log('oh no:', err)
      })

    Recipe.insertMany(data)
      .then((response) => {
        response.forEach(recipe => {
          console.log(recipe.title)
        })

        let updateRigatoni = Recipe.findOneAndUpdate({
          title: 'Rigatoni alla Genovese'
        }, {
          $set: {
            duration: 100
          }
        })

        updateRigatoni.then(() => {
          console.log('rigatoni updated!')
        }).catch((err) => {
          console.log('rigatoni not updated', err)
        })

        let removeCarrotCake = Recipe.deleteOne({
          title: 'Carrot Cake'
        })

        removeCarrotCake.then(() => {
          console.log('carrot cake removed!')
        }).catch((err) => {
          console.log('carrot cake not removed', err)
        })

        Promise.all([updateRigatoni, removeCarrotCake])
          .then(() => {
            console.log('connection is closed')
            mongoose.connection.close()
          })
          .catch((err) => {
            console.log('connection did not close', err)
          })
      })

      .catch((err) => {
        console.log('oh no:', err)
      })

  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });