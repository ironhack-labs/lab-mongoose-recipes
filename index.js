const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

function createRecipe(title, level, ingredients, cuisine, dishType, image, duration, creator, created) {
  Recipe.create({
    title,
    level,
    ingredients,
    cuisine,
    dishType,
    image,
    duration,
    creator,
    created
  }).then(res => {
    console.log(title);
    mongoose.disconnect();
  }).catch(err => console.log(err));
}

function insertManyRecipe(arr) {
  Recipe.insertMany(arr).then(res => {
    arr.map(element => console.log(element.title))
    mongoose.disconnect();
  }).catch(err => console.log(err));
}

function updateRecipeDuration(id, newDuration) {
  Recipe.findByIdAndUpdate(id, {
    duration: newDuration
  }).then(res => {
    console.log("Recipe updated !");
    console.log(res);
    mongoose.disconnect();
  }).catch(err => console.log(err))
}

function deleteRecipe(title) {
  Recipe.deleteOne({
    title: title
  }).then(res => {
    console.log("Recipe deleted !");
    console.log(res);
    mongoose.disconnect();
  }).catch(err => console.log(err))
}
//deleteRecipe('Carrot Cake');
//updateRecipeDuration("5e31a40af341217e61cc48a4", 100)
//insertManyRecipe(data)
//createRecipe('Test2', 'Easy Peasy', ['banana', 'chocolate'], 'International', 'Dessert', '', 15, 'Yannick');
// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));