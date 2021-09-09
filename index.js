const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://anacrlima:iron2021@cluster0.98vs9.mongodb.net/recipe-app?retryWrites=true&w=majority';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({title: 'Hot Dog', level : 'Easy Peasy', ingredients: ['hot dog sausages', 'hot dog buns', 'ketchup', 'mustard'], cuisine: 'american', dishType: 'snack', duration: 20, creator: 'Ana'})
    .then(result => console.log(result.title))
    .catch(err => console.log(err));
  })
  .then(() => {
    const json = require('./data.json')
    Recipe.insertMany(json)
    .then(result => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {
            new: true
      })
      .then(result => console.log('Recipe updated'))
      .catch(err => console.log(err));
      Recipe.deleteOne({ title: 'Carrot Cake' })
      .then(result => console.log('Recipe deleted'))
      .catch(err => console.log(err));
      })
    .catch(err => console.log(err));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
