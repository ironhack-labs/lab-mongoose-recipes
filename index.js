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
    
    /* --- Iteration 1 ---
    Recipe.create(data[0])
     .then((createdBook)=>{
       console.log(createdBook.title)
     })
     .catch(error => console.log(error));
    */

     const p1 = Recipe.insertMany(data);
     const p2 = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
     const p3 = Recipe.deleteOne({title: "Carrot Cake"});

     p1
     .then((insertedArray)=>{
       insertedArray.forEach(recipe => console.log(recipe.title));
     })
     .then(()=>{
       Promise.all([p2, p3])
       .then(()=> {
        console.log("Rigatoni alla Genovese is now successfully updated.");
        console.log("Carrot Cake is now removed from the database.");
        
        mongoose.connection.close();
        console.log("Closed connection to the database.");
        })
      })     
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
