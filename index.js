const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp":
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


//create first recipe:
// Recipe.create({title: 'Ice', level: 'Easy Peasy', ingredients: ['water'], cuisine: 'World Cuisine', dishType: 'Other', duration: 4, creator: 'Talu'})
// .then(()=>{
//     console.log(`recipe create worked`)
// })
// .catch((err)=>{
//     console.log(`recipe create didn't work`, err)
// })

//insertMany from data.js:
// Recipe.insertMany(data)
// .then(()=>{
//     console.log(`insertMany worked`)
// })
// .catch((err)=>{
//     console.log(`insertMany didn't work`, err)
// })

//print tittle of all:
// Recipe.find({}, {title: 1, _id: 0})
// .then((all)=>{
//     console.log(all);
// })
// .catch((err)=>{
//     console.log(err)
// })

//update duration of Rigatoni alla Genovese:
// Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
// .then(()=>{
//     console.log(`updateOne worked! :D`)
// })
// .catch((err)=>{
//     console.log(`updateOne didn't work`, err)
// })


// Oh oh! The Carrot Cake is no longer available, so we need to
// remove it from the database. Using the Model.deleteOne method,
// remove that recipe from the database and display a success
// message after doing it!

// delete carrot cake:
// Recipe.deleteOne({title: "Carrot Cake"})
// .then(()=>{
//     console.log(`deteleOne worked! :D`)
// })
// .catch((err)=>{
//     console.log(`deteleOne didn't work`, err)
// })