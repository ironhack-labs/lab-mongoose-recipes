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
  // Run your code here, after you have insured that the connection was made
  .then(() => {
    Recipe.create({
        title: 'Brownie',
        level: 'Easy Peasy',
        ingredients: 'chocolate',
        cuisine: 'francesa',
        dishType: 'dessert',
        duration: 2,
        creator: 'desconocido'
      })
      .then(newRecipie => console.log(newRecipie.title))

  })
  .then(() => Recipe.create(data))
  .then((recipe) => recipe.forEach(elm => {
    console.log(elm.title)
  }))
  .then(() => Recipe.updateOne({
    title: 'Rigatoni alla Genovese'
  }, {
    duration: 100
  }, {
    new: true
  }).then(details => console.log("Los detalles de la modificación son:", details)))

  .then(() => Recipe.deleteOne({
    title: 'Carrot Cake'
  }).then(deletedItem => console.log(deletedItem)))
  .then(() => mongoose.connection.close() )
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
  