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

Recipe.deleteMany()
.then(()=> {
  console.log("delete")
  Recipe.create({
    title: "Pizza",
    level:'Easy Peasy',
  })
  .then(value => {
    console.log(value);
    Recipe.insertMany(data)
    .then(value => {
      console.log(value)
      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then(value => {
        console.log(value)
        Recipe.deleteOne({title: "Carrot Cake"})
        .then(data => {
          console.log(data)
        })
    })
  })
})
})