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
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any documents to the database, let's delete all previous entries
  //   return self.connection.dropDatabase();
  // })
  // .then(() => {
  //   // Run your code here, after you have insured that the connection was made
  //   Recipe.insertMany(data).then(recipes => {
  //     console.log(recipes);
  //   });
  // })
  // .catch(error => {
  //   console.error('Error connecting to the database', error);
  // });

  // Iteration 2 - Create a recipe
 
  // Recipe.create({title: 'Test recipe', ingredients: ["Seidentofu", "Tamari", "Zwiebel", "Schwefelsalz"], cuisine: 'Asian'})
  // .then(recipe => console.log(recipe))
  //   .catch(error => {
  //     console.error('Adding', error);
  //   })

  // Iteration 3 - Insert multiple recipes
   
    // const json = require(__dirname + '/data.json');

    // Recipe.insertMany(json)
    // .then(recipe => console.log(recipe))
    // .catch(error => {
    //   console.error('Adding', error);
    // })

  // Iteration 4 - Update recipe

  // Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: '100'})
  // .then(result => console.log('Successfully updated recipe'));

  // Iteration 5 - Remove a recipe

  // Recipe.deleteOne({ title: 'Carrot Cake' })
  // .then(recipe => console.log('Successfully deleted recipe'));

  // Iteration 6 - Close the Database

  



