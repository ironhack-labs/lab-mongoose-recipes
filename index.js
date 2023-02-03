const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
    
  })

  .catch(err => {
    console.err('Error connecting to the database', err);
  });

    // Recipe.create(data[0])
    // .then(newRecipe => console.log(newRecipe.title))
    // .catch(err => console.log(err)) 

 // Recipe.insertMany([ ...data])
  //  .then(recipe => console.log(recipe))
  //  .catch(err => console.log(err))

  Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 }, { new: true })
    .then(duration => console.log("changed duration!"))
    .catch(err => console.log(err))

  Recipe.findOneAndDelete({ title: "Carrot Cake" })
    .then(deleted => console.log("succesfully deleted"))
    .catch(err => console.log(err))




  .finally(() => {
		
		mongoose.connection.close()
  })
