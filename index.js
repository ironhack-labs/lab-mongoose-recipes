const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

// let recipe = new Recipe()

let bananaPancakes = {
  title: "bananaPancakes",
  ingredients: ["bananas, pancakes"]
}
let recipe = new Recipe(bananaPancakes)
recipe.save()
Recipe.insertMany(data).then(datas=>{
})
Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, {$set: { "duration": 100} })
.then(updatedRag => {
console.log("updated rag === ", updatedRag);
}).catch(err => {console.log(err)});
Recipe.deleteOne({ title: "Carrot Cake" })
.then(successCallback=>{
  console.log("successCallback----------", successCallback)
})
.catch(errorCallback=>{
  console.log(errorCallback)
});









// let bananaPancakes = {
//   title:'bananaPancakes',
//   ingredients: ['banana', 'pancakes']
// }

// let sample = {
//   name: 'sample',
//   whatever: 'HELLO'
// }

// // let recipe = new Recipe(bananaPancakes)

// Recipe.create(bananaPancakes)

// // recipe.save()

// // console.log(recipe)

// // recipe.create(recipe)