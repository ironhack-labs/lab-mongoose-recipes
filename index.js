const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      title: "Paella",
      level: "Amateur Chef",
      ingredients: ["Rise", "Sea food", "Pepper"],
      cuisine: "Spanish",
      dishType: "main_course",
      image: "https://images.app.goo.gl/mEpHuMEifSsu21cv6",
      duration: 90,
      creator: "Not me",
      created: new Date()
    })
  })
  .then((myData) => 
  {
    console.log(myData.title)
    return Recipe.insertMany(data);
  })
  .then(() => 
  {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese", duration: 100})
  })
  .then(() => 
  {
    console.log("Rigatoni alla Genovese successfully changed")
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese", duration: 100})
  })
  .catch(() => {
    console.error("Change couldn't be made");
  })
  .then(() => 
  {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    console.log("Carrot Cake was deleted")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close());
