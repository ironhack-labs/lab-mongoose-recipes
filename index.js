const express = require('express')
const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const PORT = 3000;
const app = express();

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(mongooseConnect => {
    console.log(`Connected to the database: ${mongooseConnect.connections[0].name}`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = new Recipe({
      title: 'Spanish Omelette',
      level: 'Easy Peasy',
      ingredients: ['Potatoes', 'Onions', 'Eggs', 'Olive Oil'],
      cuisine: 'Spanish',
      dishType: 'main_course',
      image: 'https://sixhungryfeet.com/wp-content/uploads/2020/10/spanish-omelette-7.jpg',
      duration: 30,
      creator: 'Tomás de Zumalacárregui'
    })
    return newRecipe
  })
  .then((newRecipe) => {
    return newRecipe.save()
  })
  .then((newRecipe) => {
    console.log('recipe created')
    console.log(newRecipe)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  })
  .then(() => {
    return Recipe.deleteOne({ title: 'Carrot Cake' })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.disconnect
  })

app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`)
})
