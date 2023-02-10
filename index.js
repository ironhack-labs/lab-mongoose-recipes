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
  .then(()=>{
    Recipe.create({    "title": "Asado",
    "level": "UltraPro Chef",
    "ingredients": [
      "1/2Kg Morcilla",
      "1/2Kg Chorizo",
      "1/3 Molleja",
      "1/4Kg Pimiento",
      "3 huevo"
    ],
    "cuisine": "Argentinean",
    "dishType": "main_course",
    "image": "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
    "duration": 120,
    "creator": "Chef Rocio Salgado"})
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let promisses = []
    data.forEach(element => {
      console.log(element.title)
      let promiss = Recipe.create(element)
      promisses.push(promiss)
    });
    return Promise.all(promisses)
  })
  .then(()=>{
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration:100}, {new: true})
  })
  .then(()=>{
    console.log("OK UPDATED")
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(()=>{
    console.log("OK DELETED")
    mongoose.disconnect();
    process.kill(process.pid);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

