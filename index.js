const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    const newRecipe = {
      title: "Riojana lentils",
      level: "Amateur Chef",
      ingredients: ["Lentils", "Chorizo", "Potato"],
      cuisine: "Spanish",
      dishType: "main_course"
    }  
    return Recipe.create(newRecipe)
  })
  .then((responseFromDB) => {
    //console.log(responseFromDB.title)
return Recipe.insertMany(data)

  })
  .then((responseFromDB)=>{
  return Recipe.findOneAndUpdate ({title:"Rigatoni alla Genovese"},{duration:100})
  }
   )
.then((responseFromDB)=>{
//console.log(responseFromDB.title);
//console.log("Successfully updated")
return Recipe.deleteOne({title: "Carrot Cake"})
})
.then((responseFromDB)=>{
  //console.log("Success")
  return mongoose.disconnect()
}) 
.then((responseFromDB) => {
  console.log("disconnected")
})
.catch(error => {
    console.error('Error connecting to the database', error);
  });
