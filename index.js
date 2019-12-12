const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

app.set('views', './views');
app.set('view engine', 'hbs');

let options = { 
  useNewUrlParser: true,  
  useUnifiedTopology: true 
};

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost:27017/recipeApp', options)
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });



//Iteration 2 - create a recipe.
Recipe.create({
  title: 'King Prawn Noodles',
  level: 'UltraPro Chef',
  ingredients: ['Noodles', 'Prawns', 'Soya', 'Oil'],
  cuisine: 'Asian',
  dishType: 'Dish',
  duration: 30,
  creator: 'Michael Ta', 
})

.then((KingPrawnNoodles)=> {
  console.log(`Created successfully`);
})
.catch((err)=> {
  console.log("Err", err)
})

//Iteration 3
Recipe.insertMany(data)
  .then((recipe)=> {
    console.log("Inserted successfully")
    return Recipe.findOneAndUpdate({ "title": "Rigatoni alla Genovese"}, {"duration": 100}) //Iteration 4 - chaining promises to make it sync instead of async 
  })
  .then((recipe)=> {
    console.log("Inserted successfully")
    return Recipe.deleteOne({title: "Carrot Cake"}) //Iteration 5 - chaining promises to make it sync instead of async
  })
  .catch((error)=> {
    console.log("Err", error)
  })

  // https://github.com/Piepongwong/async-javascript

//Iteration 6
mongoose.connection.close(() => {
  console.log("Disconnected")
})

/*
// Iteration 6 - necessary?
mongoose.connection.close(() => {
  console.log('Mongoose disconnected on app termination');
  process.exit(0);
});

/*
//Iteration 4
Recipe.findOneAndUpdate({ "title": "Rigatoni alla Genovese"}, {"duration": 100})
  .then((recipe)=> {
    console.log("updated successfully")
  })
  .catch((error)=> {
    console.log("Err", error)
  })

//Iteration 5
Recipe.deleteOne({title: "Carrot Cake"})
  .then((recipe) => {
    console.log("Deleted successfully")
  })
  .catch((error)=> {
    console.log("Err", error)
  })

app.listen(3000,()=> {
  console.log("Webserver listening");
})*/