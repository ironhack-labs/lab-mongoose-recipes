const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.syncIndexes()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
          
      Recipe
        .create({ title: 'Strogonoff', level: 'Easy Peasy', ingredients: ['chicken','rice'], 
        cuisine: 'Brazilian', dishType: 'dinner', image: '', duration: 15, creator: 'Nico', created:'' })
        .then(theNewRecipe => {
          console.log('Nueva receta ha sido creada!', theNewRecipe)          
        })
        //iteracion 3
       .then(() => {
    return Recipe
      .create(data)
      .then(recipe => console.log('Se ha creado los platos:', recipe))
      .catch(err => console.log('Error!', err))
  })
  // iteracion 4
      .then(() => {
    return Recipe
      .findOneAndUpdate({ duration: 220 }, { duration: 100 })
      .then(info => console.log("Update hecho!", info))
      .catch(err => console.log('Error!', err))
  })
  // iteración 5
  .then(() => {
    return Recipe
      .deleteOne({ title: "Carrot Cake" })
      .then(info => console.log("Deleted hecho!", info))
      .catch(err => console.log('Error!', err))
  })
  // iteracion 6
  .then(() => {
    mongoose.connection.close(() => {
  console.log('Mongoose default connection closed')
    })
  })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
