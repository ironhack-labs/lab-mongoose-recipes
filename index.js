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
    return Recipe.syncIndexes()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Lasaña",
      level: "Amateur Chef",
      ingredients: ['pasta', 'carne', 'salsa de tomate'],
      cuisine: 'italiana',
      dishType: "main_course",
      duration: 90,
      creator: 'Mario'
    })

  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe
      .updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(info => console.log("Los detalles de la modificación son:", info))
      .catch(err => console.log('Hubo un error', err))
  })
  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(info => console.log('Este es un objeto informativo sobre una elimiación', info))
      .catch(err => console.log('Se produjo un error', err))
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
