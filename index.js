const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

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
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let soup = {title: "Soup",
    level: "Easy Peasy",
    ingredients: ["zuchini", "cream", "potato"],
    cuisine: "World",
    dishType: "soup",
    image: "",
    duration: 20,
    creator: "Soloong"}

    let parmentier = {title: "Parmentier",
    level: "Amateur Chef",
    ingredients: ["meat", "potato"],
    cuisine: "French",
    dishType: "main_course",
    image: "",
    duration: 60,
    creator: "Parmentier"}

    let quiche = {title: "quiche",
    level: "Amateur Chef",
    ingredients: ["eggs", "cheese", "ham"],
    cuisine: "French",
    dishType: "main_course",
    image: '',
    duration: 90,
    creator: "Robuchon"}

    Recipe.create(soup)

    Recipe.insertMany([quiche, parmentier])

    Recipe.findOneAndUpdate({title: "Soup"}, {duration: 17} , {new : true})

    Recipe.deleteOne(soup).then(function(){
      console.log("Data deleted"); // Success

      
  }).catch(function(error){
      console.log(error); // Failure
  });
    console.log(soup.title , quiche.title)
  
  })


  
  .then(() => {
    // connection.stop
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  



