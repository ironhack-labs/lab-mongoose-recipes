const mongoose = require('mongoose');

const Recipe = require('./models/Recipe.model.js')

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
  
    return self.connection.dropDatabase();
  })
  .then(() => {
   function getRecipeTitles (recipes){
const {title} = recipes;
Recipe.create({title});
console.log(title);
   }
     
   
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.deleteOne({title:"Carrot Cake"})
  .then(successCallback)
  .catch(errorCallback);

Recipe.insertMany 