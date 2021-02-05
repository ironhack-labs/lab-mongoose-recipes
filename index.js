const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

Recipe.create({
  title: "How to cook the best pasta in the world"
}).then((data) => {
  console.log('the data has been created', data)
}).catch((err) => {
  console.log('Sth went wrong', err)
})


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
    console.log(Recipe.title)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  Recipe.insertMany(data).then((data) => {
    data.forEach((el) =>{
      console.log(el.title)
    })
  }).catch((err) => {
    console.log('Sth went wrong', err)
  })