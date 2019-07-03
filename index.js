const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

function successCallback(msg){
  console.log(msg);
}
function errorCallback(err){
  console.log(err);
}

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true } )
  .then( () => { console.log('Connected to Mongo!') } )
  .catch(err => { console.error('Error connecting to mongo', err) } )


// Recipe.create(data)
// .then( (recipe) => { console.log('these are titles', recipe) } )
// .catch((err) => { console.error('Error, your recipe was not submitted', err) } )

// Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
//   .then(successCallback)
//   .catch(errorCallback);

Recipe.deleteOne( { title: "Carrot Cake"} )
  .then(successCallback)
  .catch(errorCallback);