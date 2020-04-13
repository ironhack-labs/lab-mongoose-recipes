const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
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
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  //why do we have to have this in a .then? why can't it exist separately like in the example?
  /* .then(data => { // it's asking us to pull the very first recipe of the json file?
      Recipe.create(data[0))
        .then(recipes => {
        console.log('Recipe has been made: ', recipe)
        }).catch(error => {
        console.log('An error happened while saving the recipe:', error)
        }) */
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(data => {
      Recipe.create(data)
        .then(recipe => {
          console.log('Recipe has been made: ', recipe)
        }).catch(error => {
          console.log('An error happened while saving the recipe:', error)
        })

      // model has been exported, and schema has been defined.
      // model static is essentially a method? 
      // we are getting our "recipe" from data.json and passing it on to .create, but we only get the first recipe from data.json, since it only says one? 

      //just gonna do it piecemeal instead...since it's not working when nested all together...

      Recipe.insertMany(data) //for each? 
      then.(recipes => {
        recipes.forEach(recipe => {
          console.log(`recipe title: ${recipe.title}`)
        })
      });

      Recipe.findOneAndUpdate({
        title: 'Rigatoni alla Genovese'
      }, {
        duration: 100
      })
      then.(recipe => {
        console.log('Recipe has been sucesfully updated!', recipe)
      })
      catch.(error => {
        console.error('Error, could not update recipe duration', error);
      });

      Recipe.deleteOne({
          title: 'Carrot Cake'
        })
        .then(recipe => {
          console.log('The carrot cake recipe is now deleted')
        })
        .catch(error => {
          console.log('Error, the carrot cake recipe could not be deleted', error)
        });


      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app terminal.')
      });