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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


  // Recipe.create({
  //   title: 'Tomatosoup',
  //   level: 'Easy Peasy',
  //   ingredients: 'tomatoes',
  //   cuisine: 'italian',
  //   dishType: 'main_course',
   
  //   duration:'60',
  //   creator: 'Sophia',
   
  // }).then(newRecipe => {
  //   console.log(newRecipe)
  // }).catch(err => console.log(err));

  Recipe.insertMany(data)
  .then((recipes) => {
    for (let i of recipes){
      console.log(i.title)
    }     
   }).catch(err => console.log(err));