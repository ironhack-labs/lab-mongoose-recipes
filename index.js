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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(x => {
    console.log(`Aquí inserto las recetas: "${data}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.insertMany(data)
  })
  .then(x => {
    console.log(`Aquí edito los rigatoni`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
  })
  .then(x => {
    console.log(`Aquí borro la Carrot Cake`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .then(x => {
    console.log('database cerrada')
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// ...

