const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.js'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// data.forEach(reci => {
//   Recipe.create(reci)
//   .then(createdRecipe => {
//     console.log('Recipe created', createdRecipe.title);
//   })
// })

// Recipe.insertMany(data,function(erros,docs) {
//   if(erros){
//     console.log('Error code #')
//   }
//   else{
//     console.log(docs);
//   }
// });

// Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100}, function(error,docs){
//   if(error){
//     console.log('Error code #')
//   }
//   else{
//     console.log('duration changed to 100');
//   }
// });

// Recipe.deleteOne({title: 'Carrot Cake'}, function(error){
//   if(error){
//     console.log('Error code #')
//   }
//   else{
//     console.log('carrot cake deleted');
//   }
// });

mongoose.connection.close()