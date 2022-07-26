const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

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
    Recipe.create({
      title: "Arroz con pollo",
      level: "Easy Peasy",
      ingredients: ["arroz", "pollo", "maiz", "adobo", "agua"],
      cuisine: "Venezolana",
      dishType: "other",
      duration: "20",
      creator: "Kike",
      created:""
    })
      .then(recipe => 
        console.log(recipe))
      .catch(err => 
        console.log("ERROR!"))
  
        Recipe.insertMany(data)
          .then(console.log("Data add"))
          .catch(error => console.log('error creating recipe', error))
  
        Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
      .then( recipe => console.log("changes"))
      .catch((err) => console.log(err))
  
      Recipe.deleteOne({title: "Carrot Cake"})
      .then( recipe => {
        console.log("delete")
        mongoose.connection.close(() => {
          console.log('disconect')
          process.exit(0)
        })
      })
      .catch((err) => console.log(err))
 })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
