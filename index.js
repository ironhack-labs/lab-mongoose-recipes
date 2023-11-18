const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    
    return Recipe.deleteMany();
  })
  .then(() => {
    
    return Recipe.create(data);
  })
  .then(() => {
    
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    
    return mongoose.connection.close();
  })
  .then(() => {
    
    console.log('Connection closed');
  })
  .catch(error => {
    
    console.error(error);
  });

 