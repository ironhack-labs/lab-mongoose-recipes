const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
        .then(x => console.log(`Connected to the database: "${x.connection.name}"`))
                Recipe.deleteMany()
        .catch(err => {console.error('Error connecting to the database', err)});

  Recipe.create({
  title:'Amêijoas', 
  level:'Easy Peasy', 
  ingredients:['Amêijoa', 'Alho', 'Azeite', 'Malagueta', 'Louro', 'Sal'], 
  cuisine: 'Portuguesa', 
  dishType: 'other', 
  duration: 20, 
  creator: 'Viviane'})
  .then (title => {console.log(title)})
  

  Recipe.insertMany(data)
    .then(data => {console.log(data)})
    .then(recipes => console.log(recipes))

  
  Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100}, {new:true})
    .then(updatetime => console.log('updatetime', updatetime))


  return Recipe.deleteOne({title: 'Carrot Cake'})
    .then(deleted => console.log('deleted', deleted))
    
    
    .catch(error => console.log('Not deleted recipe'));