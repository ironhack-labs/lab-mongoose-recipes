const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({title: "Biscuits and Gravy", cuisine: "American"}).then(() => {})
    Recipe.insertMany(data).then(() => {Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}).then(() => {Recipe.deleteOne({title: "Carrot Cake"}).then(() => {connection.end().then(() => {console.log("Connection to DB has been terminated.")}), console.log("Recipie Deleted!")}), console.log("It's updated!")})
    console.log("It's ALIVE!")})
    

  })
  .catch(error => {
    console.error('Error connecting to the database', error);

  })
 
  
