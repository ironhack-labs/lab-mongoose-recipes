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
    return Recipe.deleteMany()
  })
  .then(() => {
   return Recipe.create({
      title: 'asdasd',
      level: 'Easy Peasy',
      ingredients: ['tomate', 'cebolla'],
      cuisine: 'holahola',
      dishType: 'breakfast',
      duration: '5',
      creator: 'jose'
    })
  })    
  .then(() => {
   return Recipe.insertMany(data)
    .then(recipes => console.log('titles', recipes))
    .catch(error => console.log(error))
  })
  .then(() => { 
     return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true})
    .catch(error => console.log(error))
  })
  .then(() => {
    return Recipe.findOneAndDelete({title: 'Carrot Cake'})
    .catch(error => console.log(error))
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  
  });

  mongoose.disconnect();
