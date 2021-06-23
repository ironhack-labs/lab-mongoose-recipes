const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

// The connection string for receipe-app DB is a constant
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const secretRecipe = {
  title: 'sopaDura', 
  level: 'Easy Peasy', 
  ingredients: ['tomatoes', 'potatoes', 'salt', 'aquarius'], 
  cuisine: `noMan'sLand`,
  dishType: 'other',
  duration: '15',
  creator: 'armyCook'
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.syncIndexes()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe
      .create( secretRecipe )
      .then( newRecipe => console.log( `The new dish is called: ${newRecipe.title}`))
      .catch( err => console.log(`If your cooking won't get us, your sloppy coding will! Error: ${err}`))
  })
  .then(() => {

    return Recipe
      .create( data )
      .then( newRecipe => {
        newRecipe.forEach( recipe => console.log( `The new dish is called: ${recipe.title}`) )
        
      })
      .catch( err => console.log(`If your cooking won't get us, your sloppy coding will! Error: ${err}`))

    })
  .then(()=>{
    return Recipe
      .updateOne( {title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
      .then(updatedRecipe => console.log('Success! Cooking time should be 100 ', updatedRecipe))
      .catch( err => console.log(`If your cooking won't get us, your sloppy coding will! Error: ${err}`))
        // updateOne findOneAndUpdate
  })
  .then(() => {
    const badRecipe = 'Carrot Cake'
    return Recipe
      .deleteOne( {title: badRecipe})
      .then(deletedRecipe => console.log(`Success! ${badRecipe} deleted!`))
      .catch( err => console.log(`If your cooking won't get us, your sloppy coding will! Error: ${err}`))
  })
  .then(()=>{
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'))

// Even if the connection has been properly closed, we keep watching for application errors:
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0)
    })
})