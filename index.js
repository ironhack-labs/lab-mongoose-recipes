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
    return Recipe.deleteMany({})
      .then(() => console.log('database wiped'))
      .catch(e => console.error('Error wiping database', e));
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(data)
      .then(console.log('data was added'))
      .catch(e => console.error('Error adding entries', e))
      .then(() => Recipe.updateOne({
        title: "Rigatoni alla Genovese"
      }, {
        duration: 100
      }))
      .then(console.log('Rigattoni Updated'))
      .catch(e => console.error('Error updating entry' + e))
      .then(() => Recipe.deleteOne({
        title: 'Carrot Cake'
      }))
      .then(console.log('Carrot Cake removed'))
      .catch(e => console.error('Error removin entry' + e))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  process.on('SIGINT', () => mongoose.connection.close(() => console.log('Closing mongoose')));