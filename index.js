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

let promise1 = Recipe.create({
  title: 'Fried Egg by Marcus',
  level: 'UltraPro Chef',
  ingredients: ['3 eggs', '1 tablespoon butter', 'salt to taste'],
  cuisine: 'Lazy Food',
  dishType: 'Breakfast',
  image: 'https://pt.wikipedia.org/wiki/Omelete#/media/Ficheiro:FoodOmelete.jpg',
  duration: 10,
  creator: 'Marcus'
})

let promise2 = Recipe.insertMany(data)

let promise3 = Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 })

let promise4 = Recipe.deleteOne({ title: 'Carrot Cake' })


Promise.all([promise1, promise2, promise3, promise4])
  .then(values => {
    console.log("Recipes have been created, inserted, updated and deleted");
    console.log(values);

    mongoose.connection.close();
  })
  .catch(err => console.error(err));
