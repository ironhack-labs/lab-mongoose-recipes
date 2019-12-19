const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const handleFulfiledProm = theArrayIamExpecting => {
  theArrayIamExpecting.forEach(e => console.log(e));
};

// Recipe.create()
Recipe.insertMany(data)
  .then(handleFulfiledProm)
  .catch((err) => console.log('erro: ', err))

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })
.then( (toma) => console.log('success!', toma))
.catch( (err) => console.log(err))