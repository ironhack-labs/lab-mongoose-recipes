const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    return Recipe.deleteMany({});
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then( recipes => {
    recipes.forEach( recipe => console.log(recipe.title));

    const promises = [];
    promises.push(Recipe.updateOne({title: 'Rigatoni alla Genovese' },  {duration: 100}));
    promises.push(Recipe.deleteOne({title: 'Carrot Cake' }));

    return Promise.all(promises);
  })
  .then(() => {
    return Recipe.find({});
  })
  .then( recipes => console.log(recipes))
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })
  .finally(() => {
    mongoose.connection.close();
  });

