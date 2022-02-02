const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { findOneAndUpdate } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"

mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => Recipe.syncIndexes())
  .then(() => {
    return Recipe
          .create(data)
          // Run your code here, after you have insured that the connection was made    
  })

  .then(theDish => {
      theDish.forEach(elm => console.log(`${elm.title}`))
      const query = {title: "Rigatoni alla Genovese"}
      return Recipe.findOneAndUpdate(query, {duration: 100}, {new: true})
  })

  .then((theDish => {
    console.log("Successfully changed the duration of: ", theDish)
    return Recipe.deleteOne({title: "Carrot Cake"})
  }))

  .then(deleted => {
    console.log("Successfully deleted: ", deleted)
    mongoose.connection.close()
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  })


