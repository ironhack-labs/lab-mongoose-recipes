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
    let newRec = {
      title: 'Pot Stickers',
      level: 'Easy Peasy',
      cuisine: 'good',
    }
    Recipe.create(newRec).then(res => console.log(res.title)).then(() => {
      Recipe.insertMany(data).then(res => {
        res.forEach(elem => {
          console.log(elem.title)
        })
      }).then(() => {
        Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { durations: 100 }, { new: true }).then(() => {
          console.log("Rigatoni fixed")
        }).then(() => {
          Recipe.deleteOne({ title: 'Carrot Cake' }).then(() => {
            console.log('deleted carrot cake')
          }).then(() => {
            mongoose.connection.close()
          })
        })
      })
    })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
