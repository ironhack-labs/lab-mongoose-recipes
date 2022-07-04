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
    Recipe.create({title: "Blueberry Oatmeal", level: "Easy Peasy", ingredients: ["otameal", "bluberries", "milk", "cinnamon"], cuisine: "International", dishtype: "breakfast"})
    .then(recipe => console.log(recipe))
   .catch(error => console.log('An error happened while creating recipe:', error))

    Recipe.insertMany(data)
    .then(console.log("Data added"))
    .catch(error => console.log('An error happened while creating recipe:', error))

    Recipe.find({}, {title: 1})
    .then(console.log)
    .catch((err) => console.log(err))
  
    Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
    .then( recipe => console.log("Update successful"))
    .catch((err) => console.log(err))
  
    Recipe.find({}, {title: 1, _id: 0})
    .then(console.log)
    .catch((err) => console.log(err))
  
    Recipe.deleteOne({title: "Carrot Cake"})
    .then( recipe => {
      console.log("Delete successful")
      mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected')
        process.exit(0)
        })
    })
    .catch((err) => console.log(err))

})
.catch(error => {
  console.error('Error connecting to the database', error);
})
