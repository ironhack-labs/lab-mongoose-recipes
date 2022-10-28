const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then(x => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany()
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//   })
//   .catch(error => {
//     console.error('Error connecting to the database', error);
//   });

const recipe = async function(){
  try {
    const x = await mongoose.connect(MONGODB_URI)
    console.log(`Connected to the database: "{x.connection.name}"`)
     //await Recipe.deleteMany()
    //await Recipe.create({title: 'cuscus', duration: '100', cuisine:'israel'})
    //console.log(newrecep.title)
    
      //await Recipe.insertMany(data)
    //console.log({allrecep})
    //await Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
    //console.log("success")
    //await Recipe.deleteOne({title:"Carrot Cake"})
    
    mongoose.connection.close()
  }
  catch (err){
    console.log(err)
  }
}



recipe()