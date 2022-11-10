const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "test",
      level: "Easy Peasy",
      ingredients: ["bananas", "peppers"],
      cuisine: "japanese",
      dishType: "breakfast",
      duration: 30,
      creator: "Enrique"
    });
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, { duration: 100 })  
  })

  .then (() => console.log('success!'))

  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake'})
  })

  .then (() => console.log('success (cc deleted) !'))

  .then(() => {
    return mongoose.connection.close()
  })

  .then (() => console.log('connection closed'))
  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
