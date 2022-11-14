const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({title:"recipe test", cuisine: "tasty code", ingredients:["blood - 2pints", "sweat - 1cup", "tears - an Oceans worth"]})
  })

  .then(() => {
    return Recipe.insertMany(data)
  })

  
  .then(() => {
    return Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration: 100})
  })
  
  .then(() => {
    return Recipe.deleteOne({title: "carrot cake"})
  })
  
  .then(() => {
    mongoose.connection.close()
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });