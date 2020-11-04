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

   Recipe.create({ title: "food" }).then(console.log("food created"))
   // Recipe.find({ title: "food" }).then(foods => console.log(foods))//here this doesnt work
   const arr = [{ title: 'pie' }, { title: 'burger' }];
   Recipe.insertMany(arr, function(error, docs) {});


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Recipe.find({ title: "food" }).then(foods => console.log(foods))//one foo
  Recipe.find().then(foods => console.log(foods))//all foods
