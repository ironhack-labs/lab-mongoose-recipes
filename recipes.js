const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');
const Recipe = require('./models/Recipe');


const createRecipes = () => {
  let proms = [];
  data.forEach(e => {
    proms.push(Recipe.create(e));
  });
  return Promise.all(proms);
};

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    return Recipe.collection.drop();
  })
  .then(() => {
    console.log('Connected to Mongo!');
    return createRecipes();
  })
    // Already inserted the array with a forEach loop. This method works as well
    // return Recipe.insertMany(data);
  .then(() => {
    return Recipe.find({}, {title: 1, _id: 0})
  })
  .then(title => {
    console.log(title);
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(() => {
    return Recipe.find({title:'Rigatoni alla Genovese'});
  })
  .then((title) => {
    console.log(title);
    return Recipe.remove({title: 'Carrot Cake'});
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
  })






