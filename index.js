const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { db } = require('./models/Recipe.model');

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
    Recipe.create({title: 'Caesar Salad', level: 'Easy Peasy', cuisine: 'Mediterranean'})
      .then(()=>{
        Recipe.find({title: 'Caesar Salad'}, {title:1})
          .then((recipe)=>
          console.log(recipe)
          )
      })
    Recipe.insertMany(data)
      .then(()=>{
        Recipe.find({},{title:1})
          .then((recipe)=> console.log(recipe))
          Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {$set: {duration:100}})
          .then(()=> console.log ('Rigatoni updated succesfully'))
          Recipe.deleteOne ({title: 'Carrot Cake'})
          .then(()=> console.log ('Cake deleted succesfully'))
        })

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  
