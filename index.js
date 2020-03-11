const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));

Recipe.create(data[0])
  .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
  .catch(err => { console.log('An error happened:', err)});

 Recipe.insertMany(data)
   .then(recipe => { recipe.map(data => console.log('The recipe is saved and its name is ',data.title)) })
   .catch(err => { console.log('An error happened:', err)});

Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: '100' })
  .then(recipe => console.log("Success! Recipee updated. More info: ",recipe))
  .catch(err => { console.log('An error happened:', err)});

Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(recipe => console.log("Success! Recipee deleted. More info: ",recipe))
  .catch(err => { console.log('An error happened:', err)});

mongoose.disconnect();