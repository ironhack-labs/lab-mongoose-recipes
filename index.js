const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';
// Connection to the database "recipe-app"
mongoose.connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const promisesArr = [];
    data.forEach(dataPiece => {
      const promise = Recipe.create({
        title: dataPiece.title, 
        level: dataPiece.level,
        ingredients: dataPiece.ingredients,
        cuisine: dataPiece.cuisine,
        dishType: dataPiece.dishType,
        image: dataPiece.image,
        duration: dataPiece.duration,
        creator: dataPiece.creator
      })
      promisesArr.push(promise)
    });
    return Promise.all(promisesArr)
  })
  .then(() => {
    console.log("slay")
    return Recipe.findOneAndUpdate({"title": "Rigatoni alla Genovese"}, {$set: {"duration": 100}})
  })
  .then((updated) => {
    console.log('updated: ', updated)
  })
  .then(() => {
    return Recipe.deleteOne({"title": "Carrot Cake"})
  })
  .then((deleted) => {
    console.log("deleted ", deleted)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => mongoose.connection.close())
