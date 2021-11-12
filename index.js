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
      // iteration 2
    // Run your code here, after you have insured that the connection was made
    // return Recipe.create({
    //   title: "Pancakes", 
    //   level: "Easy Peasy", 
    //   ingredients: ["Flour", "Oatmilk", "Honey", "Vanilla"],
    //   cuisine: "German",
    //   dishType: "breakfast",
    //   duration: 20,
    //   creator: "Micha"
    // })
      // iteration 3
    return Recipe.insertMany(data)
  })
  .then(() => {
    return Recipe.find({}, {title: 1, _id: 0})
  })
  .then((allRecipesTitles) => {
    console.log(allRecipesTitles);
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
  })
  .then(() => {
    console.log("Deleted Successfully");
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });