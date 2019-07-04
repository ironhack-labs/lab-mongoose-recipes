const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const recipe = new Recipe({ title: "Teste", level: 'Easy Peasy', ingredients: [], cuisine: 'brasileira', dishType: 'Breakfast', duration: 10, creator: 'Layza' });


Recipe.create(recipe);

Recipe.insertMany(data);

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 });


Recipe.findByIdAndUpdate('5d1e2bcd78aa5f43e5e728d3', { duration: 100 })
  .then((res) => {
    console.log('sucesso', res);
  })
  .catch(err => console.log(err));


Recipe.deleteOne({ title: 'Rigatoni alla Genovese' })
  .then((res) => {
    console.log('sucesso', res);
  })
  .catch(err => console.log(err));

mongoose.connection.close();
