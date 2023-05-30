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
    Recipe.insertMany(data, function (error, recipies){
      if (error) {
        console.log(`Error occurred during getting recipes: ${error}`);
        return;
      }
      console.log('Got all the RECIPES Titles!');
      return recipies.forEach(doc => console.log(` --> recipe title: ${doc.title}`));
    })
  })


  //wasn't able to update the duration - iteration 4

  /* .then (() => {
    let filter = {title:'Rigatoni alla Genovese'};
    let update = {duration: 100};

    Recipe.findOneAndUpdate(filter, update, {
      returnOriginal: true
    });
    /*.then(updatetime => console.log('updatetime', updatetime))
  }) */



//wasn't able to delete - iteration 5

  /* .then(() => {
    await Recipe.deleteOne({title: 'Carrot Cake' });
  }) */


  .catch(error => {
    console.error('Error connecting to the database', error);
  })


  mongoose.connection.close()