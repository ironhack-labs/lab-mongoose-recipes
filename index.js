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

let promise1 = Recipe.create(
  {
    title: 'Arroz de Pato',
    level: 'Easy Peasy',
    ingredients: ['Pato', 'Arroz'],
    cuisine: "Portuguese",
    dishType: 'Snack',
    image: "https://www.pingodoce.pt/wp-content/uploads/2016/12/arroz-de-pato-516x310.jpg",
    duration: 30,
    creator: 'Corona',
  }).then(result => {
    console.log(`the recipe was created and the result is ${result}`)
  })

let promise2 = Recipe.insertMany(data).then(result => {
  console.log(`Multiple entries added to the database ${result}`)
})

let promise3 = Recipe.update({ title: 'Rigatoni alla Genovese' }, { duration: 100 }).then(result => {
  console.log(`Success! Recipe duration was updated: ${result}`)
});

let promise4 = Recipe.deleteOne({ title: 'Carrot Cake' }).then(result => {
  console.log(`The Recipe with the name ${result} was deleted`)
})

Promise.all([promise1, promise2, promise3, promise4])
  .then();