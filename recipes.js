const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')
const Recipe = require('./models/Recipe.js')


const createRecipe = (data) => {
  return Recipe.create(data)
  .then(()=>{
  }).catch( err => {console.log (err) });
}

const crazyRecipes = () => {
  let proms = []
  for (let i=0; i <data.length; i++) {
    proms.push(createRecipe(data[i]));
  }
  return Promise.all(proms);
}


mongoose.connect('mongodb://localhost:27017/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to db")
    return Recipe.collection.drop();
  }).then( () => {
    return crazyRecipes();
  }).then( () => {
    return Recipe.updateOne({"title": 'Rigatoni alla Genovese'}, {duration: 100})
  }).then( () => {
    return Recipe.deleteOne({title: "Carrot Cake"});
  }).then(() => mongoose.disconnect() )
  .catch(err => {
    console.error('Error', err)
  });



