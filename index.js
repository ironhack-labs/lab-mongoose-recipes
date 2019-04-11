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


//Model Creation
Recipe.create({
  title: "Pollo a la Brasa",
  level: "Amateur Chef",
  ingredients: ["pollo", "aceite", "patatas", "ensalada", "aliño"],
  cuisine: "peruvian",
  dishType: "Dish",
  image: "",
  duration: 60,
  creator: "Daniel",
  created: ""
}).then(recipeData => {
  console.log("my recipe is in data base", recipeData);
}).catch(err => {
  console.log(err, " Error");
})