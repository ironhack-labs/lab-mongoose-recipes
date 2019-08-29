const mongoose = require('mongoose');
const recipeSchema = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'
const Recipe = mongoose.model('recipeApp', recipeSchema);

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


Recipe.deleteMany({}).then(() => {
  Recipe.create({ title: "i am title", cuisine: "mexican" })
    .then(data => { console.log('The user is saved and its value is: ', data) })
    .catch(err => { console.log('An error happened:', err) });

  Recipe.insertMany(data).then(data.forEach((recipe) => console.log('title', recipe.title)))
})



  // recipexy.save()

  // Recipexy.find().then(allCatsFromDatabase => {
  //   console.log(allCatsFromDatabase)
  // })