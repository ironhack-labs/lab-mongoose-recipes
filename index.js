const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  
  
  
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    //Iteration 2
    /*Recipe.create(data[0])
      .then(recipe => console.log('recipe its created and its value is ', recipe))
      .catch(err => console.log('And error happened', err))*/

      //Iteration 3
    Recipe.insertMany(data)
      .then(console.log('recipe its created'))
      .catch(err => console.log('And error was happened', err))
    
    Recipe.find({title: ""})
      .then(title => console.log('Success printing titles', title))
      .catch(err => console.log('A error happened printing tittles', err))
     
      
      //Iteration 4
    Recipe.findOneAndUpdate({name:'Rigatoni alla Genovese'}, {duration:100})
      .then(console.log("Time was Updated"))
      .catch(err => console.log('A error happened updating the time', err))

      
      
    //Iteration 5
    Recipe.deleteOne({title: "Carrot Cake"})
      .then(console.log("the carrot cake was delete"))
      .catch(err => console.log("A error happened deleting the carrot cake", err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
