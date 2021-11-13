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
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    /*return Recipe.create({
    title: "Crepes", 
    level: "Easy Peasy", 
    ingredients: ["Flour", "Almond milk", "Brown sugar", "Butter"],
    cuisine: "French",
    dishType: "breakfast",
    duration: 60,
    creator: "unknown"
  })
  .then(() => {
    return Recipe.find({title: "Crepes"}, {title: 1})
  });
  */
 
   return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.find({}, {title: 1, _id: 0})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
