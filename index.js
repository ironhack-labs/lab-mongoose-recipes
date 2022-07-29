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
return Recipe.create({title:'Pad Thai', level: 'UltraPro Chef', cuisine: `Rachel's cuisine`})
.then((value) => console.log(value.title))
.catch((err)=> console.log(err))
  })
.then(() => {
  return Recipe.insertMany([...data])
})
.then(() => {
return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
.then(() => console.log('Successfully changed!'))
.catch(err => console.log(err))
})
.then(()=>{
return Recipe.deleteOne({title: 'Carrot Cake' })
.then(value => console.log(value))
.catch(err => console.log(err)); 
})  
.then(() =>{
return mongoose.connection.close();
})
.catch(error => {
    console.error('Error connecting to the database', error);
}); 