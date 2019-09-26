const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    Recipe.insertMany(data)
    
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

Recipe.create({title:"ovo frito", level: "Easy Peasy",ingredients:["ovo","sal","oleo/mantega"],cuisine: "global",dishType:"Breakfast",image:"https://cozinhatecnica.com/wp-content/uploads/2015/02/ovo-frito-e1529422904766.jpg",duration:3,creator:"JOC"})
.then(recipe => { console.log(recipe.title)})
.catch(err=> {console.log("An error happened", err)});

//Recipe.insertMany([{title:"ovo cozido", level: "Easy Peasy",ingredients:["ovo","sal","oleo/mantega"],cuisine: "global",dishType:"Breakfast",image:"https://cozinhatecnica.com/wp-content/uploads/2015/02/ovo-frito-e1529422904766.jpg",duration:3,creator:"JOC"},{title:"ovo poche", level: "Easy Peasy",ingredients:["ovo","sal","oleo/mantega"],cuisine: "global",dishType:"Breakfast",image:"https://cozinhatecnica.com/wp-content/uploads/2015/02/ovo-frito-e1529422904766.jpg",duration:3,creator:"JOC"}]);
// Recipe.insertMany(data);