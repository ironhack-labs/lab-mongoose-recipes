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
  .then(() => Recipe.syncIndexes()) 
  .then(() => {
    
    
    return Recipe
      // .create({title:'huevos',level:'Easy Peasy',ingredients:['patatas','chorizo'],cuisine:'cocina',dishType:'breakfast',duration:20,creator:'iñigo'})

      .insertMany(data)
      console.log('estoy en then',data)
  })

  .then(()=>{
    return Recipe
      .findOneAndUpdate({ title: 'Rigatoni alla Genovese' },{duration:20})
  })
  .then(()=>{
    return Recipe
      .deleteOne({ title: 'Carrot Cake' })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
