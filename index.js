const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const json = require('./data.json')

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndUpdate: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    // return self.connection.dropDatabase();
  })
  // .then(() => {
    // Recipe.create({ title: "Arroz con habichuelas", cuisine: "Spanish"})
    // Recipe.insertMany(json, function(error, docs) {});
    // return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    // return Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(() => {
      return mongoose.connection.close(() => {
          console.log("database is closed")
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
