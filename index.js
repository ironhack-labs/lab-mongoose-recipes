const mongoose = require('mongoose');
const recipeData = require('./data.json')
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
    // Run your code here, after you have insured that the connection was made
    Recipe.create(recipeData)
      .then(allRecipes => console.log(allRecipes))
      .then(() => Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}))
      .then(updatedRiga => console.log('Se ha actualizado la receta', updatedRiga))
      .then(() => Recipe.deleteOne({title: "Carrot Cake"}))
      .then(deletedCarrot => console.log('Se ha terminado la Carrot Cake', deletedCarrot))
      .catch(err => console.log('No has conseguido nada', err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()
