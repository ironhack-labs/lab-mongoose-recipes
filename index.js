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



Recipe.create({title: "ratatouille", level: "Easy Peasy", cuisine: "french"})
.then(recipe => {console.log("The recipe is reciped :", recipe)} )
.catch(err => {console.log("An error happened :", err)})

Recipe.insertMany(data)
.then(res => res.forEach( r => console.log(r.title)))
.catch(err => console.error("an error has occured", err));



Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, {duration: 100})
.then(res => console.log(res))
;

Recipe.deleteOne({title: "Carrot Cake"}).then(res => console.log("success"))

//disconnect from mongoose
mongoose.connection.close(function(){
  console.log("Mongoose default connection is disconnected due to application termination.", "Connection readyState : ", mongoose.connection.readyState)
  console.log(mongoose.connection.readyState)})
  ;

console.log(mongoose.connection.readyState)