const mongoose = require('mongoose');
const process = require('process')

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
    Recipe.deleteMany({})
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create(data)
      .then(recipe => {
        // console.log('The user is saved and its value is: ', recipe)
      })
      .catch(error => console.log('An error happened while saving a new user:', error));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

Recipe.find({}, 'title -_id')
  .then(title => {
    console.log(title);
  })
  .catch(error => console.log('An error happened while find title:', error));


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
