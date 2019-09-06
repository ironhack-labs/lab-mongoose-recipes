const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


function all() {
  create()
  insert()
  update()
  deleteOne()
  mongoose.connection.close();
}

all();


function create() {
  Recipe.create({
    title: "Pesto Pasta",
    level: "Easy Peasy",
    ingredients: ["Pasta", "Pesto"],
    cuisine: "Italian",
    dishType: "Dish",
    duration: 50,
    creator: "Steve Wright"
  }).then(data => {
    console.log(data.title);
  })
}

function insert() {
  Recipe.insertMany(data).then(data => {
    console.log(data);
  })
}

function update() {
  Recipe.updateOne({
    title: "Rigatoni alla Genovese"
  }, {
    title: "Rigatoni alla Genovese",
    duration: 100
  }).then(data => {
    console.log("success");
  })
}

function deleteOne() {
  Recipe.deleteOne({
    title: "Carrot Cake"
  }).then(data => {
    console.log("YEAHHHHH!!!!!")
  })
}