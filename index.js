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
  //Iteration 6: close connection
  .then(() => {
    return  mongoose.connection.close()
  })
  .then(()=> {console.log("connection closed")})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

          //Iteration 2: create single entry
    // .then(() => {
    //   return Recipe.create(data[2]) //Iteration 1: create single entry
    // })
    // .then((res) => {
    //   console.log("It.1 --> created a single entry: " + res.title)
    // })
//---------------------------------------------------------------------------//
          //Iteration 3: insert whole Array
    // .then(() => {
    //   return Recipe.insertMany(data)
    // })
    // .then((res)=> {
    //   res.forEach(entry => console.log(entry.title))
    // })
//---------------------------------------------------------------------------//
          //Iteration 4: update single recipe duration
    // .then(() => {
    //   return Recipe.insertMany(data)
    // })
    // .then(()=> {
    //   return Recipe.findOneAndUpdate({title : "Rigatoni alla Genovese"}, {duration : 100})
    // })
    // .then(res => console.log("The '" + res.title + "' recipe have now a Doration of " + res.duration + " min"))
//---------------------------------------------------------------------------//
        //Iteration 5: remove single recipe
    // .then(() => {
    //   return Recipe.insertMany(data)
    // })
    // .then(()=> {
    //   return Recipe.deleteOne({title : "Carrot Cake"})
    // })
    // .then(res => console.log("The Carrot Cake is out!! sorry!"))