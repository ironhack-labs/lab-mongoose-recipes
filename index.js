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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Create a recipe

  // Recipe.create(data[1])
  // .then(data => console.log('The title of the recipe is:', data.title))
  // .catch(error =>console.log(error))

  // Recipe.insertMany(data)
  // .then(datafood =>{
  // datafood.forEach(element => {
  //     console.log(element.title)
  // });
  // })

  // Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
  //   .then(recipe => console.log("we changed the duration"))
  //   .catch((err) => console.log(err));

  // Recipe.deleteOne({title:"Carrot Cake"})
  // .then((noCake)=>{
  //   console.log("Sorry but we dont have carrot Cake")
  // })
  // .catch((err) => console.log(err));

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });