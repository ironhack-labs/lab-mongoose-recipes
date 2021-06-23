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
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.syncIndexes()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Recipe.create({
    //   title: "cheese cake",
    //   level: "Easy Peasy",
    //   ingredients: ["150 mantequilla", "200g sugar"],
    //   cuisine: "Spanish",
    //   dishType: "dessert",
    //   image: "https://www.recetasderechupete.com/wp-content/uploads/2018/03/Tarta-de-queso-Antonio.jpg",
    //   duration: 30,
    //   creator: "Some one",
    return Recipe.create(data)
    })
  .then((recipe) => {
    recipe.forEach((elm) =>console.log(`${elm.title}`))
  })
  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {$set: {duration: 100}})
  })
  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"})
  })
  .then(() => {
    mongoose.disconnect()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
