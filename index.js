const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'


const exampleRecipe = new Recipe
// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.deleteMany({}).then(() => {

  Recipe.insertMany(data).then(data => {
    console.log('recipes saved: ', this.title);

    let promise1 = Recipe.create({ title: 'recipe1', level: 'Easy Peasy', cuisine: 'dont know' })
      .then(recipe => { console.log('The recipe is saved and its value is: ', recipe) })
      .catch(err => { console.log('An error happened:', err) });

    let promise2 = Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 })
      .then(recipe => console.log(recipe + "updated"))
      .catch(err => console.log(err));

    let promise3 = Recipe.deleteOne({ title: "Carrot Cake" })
      .then(() => console.log("Carrot Cake deleted"))
      .catch(err => console.log(err));

    Promise.all([promise1, promise2, promise3]).then(() => {

      mongoose.connection.close()
    })
  }).catch(err => { console.log('An error happened:', err) });
})


