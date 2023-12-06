const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb+srv://anaazamoran:Mongodb4815@testcluster.l5ql3qh.mongodb.net/recipes';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany()
  })
  .then(()=>{
    return Recipe.create({
      title: 'Anas Cake',
      level: 'Easy Peasy',
      ingredients: ['flour', 'milk', 'cheese', 'egg'],
      cuisine: 'Spanish',
      dishType: 'dessert',
      duration: 200,
      creator: 'Ana Zamora',
    })
  })
  .then((myRecipe)=>{
    console.log(myRecipe.title)
    return Recipe.insertMany(data)
  })
  .then((allRecipes)=>{
    allRecipes.forEach(elm=> console.log(elm.title))
  return Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then (()=>{
    return Recipe.deleteOne({title:'Carrot Cake'})
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(()=>{
    mongoose.connection.close()
  });
