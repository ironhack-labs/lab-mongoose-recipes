const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

let promise0 = Recipe.deleteMany()
let promise1 = Recipe.insertMany(data)
let promise2 = Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration:100})
let promise3 = Recipe.deleteOne({title:"Carrot Cake"})
let promise4 = mongoose.disconnect()

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
       return Promise.all([promise0,promise1,promise2,promise3,promise4]).then(data => {
        console.log(data)
      }).catch( err => console.log("eeeerroorrr"  ,err))
 
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });







   


