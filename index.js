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
    //return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

/* iteration 2*/
let createPromise = Recipe.create(  {
    "title": "Chocolate & Vanilla Chip Cookies",
    "level": "Amateur Chef",
    "ingredients": [
      "1/2 cup light brown sugar",
      "1 large egg",
      "2 tablespoons milk",
      "1 1/4 teaspoons vanilla extract",
      "2 cups semisweet chocolate chips",
      "A lot of vanilla"
    ],
    "cuisine": "French",
    "dishType": "dessert",
    "image": "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4398987.jpg&w=596&h=399.32000000000005&c=sc&poi=face&q=85",
    "duration": 30,
    "creator": "Chef Jennifer & Justo"
  })
  .then( res => {
    console.log(res.title)
  })

/*
iteration 3*/
let insertManyPromise = Recipe.insertMany(data)
  .then( res => {
    console.log(res)
  })

/* iteration 4 */
let updatePromise = Recipe.update({title: 'Rigatoni alla Genovese'}, {$set: {duration: 100}})
  .then( res => {
    console.log('Success..', res)
  })
  .catch( err => {
    console.error( err )
  })
let deletePromise = Recipe.deleteOne({title: 'Carrot Cake'})
  .then( res => {
    console.log('Deleted.. ', res)
  })
  .catch( err => {
    console.error( err )
  })

Promise.all([createPromise, insertManyPromise, updatePromise, deletePromise])
    .then( res => {
      mongoose.disconnect()
        .then( () => {
          console.log('Done & disconnected.')
        })
        .catch( err => {
          console.log('Can`t disconnect!', err)
        })
    })
    .catch( err => {
      console.log('Some promise(s) didn`t fulfill..', err)
    })