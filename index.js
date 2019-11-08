const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({
    title: 'Orange juice',
    level: 'Easy Peasy',
    ingredients: ['oranges', '2 table spoons sugar'],
    cuisine: 'International',
    dishType: 'Drink',
    image: 'https://www.nawrasseafood.com/wp-content/uploads/2018/01/orange-juice.jpg',
    duration: 5,
    creator: 'Chef Madhavi'
  })
  .then((title) => {
    console.log(title);
  })
  .catch(err => {
    console.log(err);
  })

Recipe.insertMany(data)
  .then((title) => {
    console.log(title);
  })
  .catch(err => {
    console.log(err);
  })

Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    duration: 100
  })
  .then(response => {
    console.log('Update successful');
  })
  .catch(err => {
    console.log(err);
  });

Recipe.deleteOne({
    title: "Carrot Cake"
  })
  .then(response => {
    console.log('Successfully deleted');
  })
  .catch(err => {
    console.log(err);
  });

// to close the connection, run:
//mongoose.connection.close();