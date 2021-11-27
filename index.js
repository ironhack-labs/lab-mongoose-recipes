const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  const sandwichRecipe = {
    title: "Sandwich de huebo",
    level: "Easy Peasy",
    ingredients: ["jam","cheese","bread"],
    cuisine: "French",
    dishType: "breakfast",
    image:"https://images.media-allrecipes.com/images/75131.jpg",
    creator: "Oswaldo",
    created: "",
  }

  // Recipe.create(sandwichRecipe)
  // .then(sandwich => console.log(sandwich.title))
  // .catch(error => console.log('An error happened while saving a new user:', error));

  Recipe.insertMany(data)
  .then(handleRecipe => console.log("All recipes added"))
  .catch(error => console.log('An error happened while saving a new user:', error));

// Recipe.updateOne({title:"Rigatoni alla Genovese"},{duration:"100"}).then(handleUpdate => console.log('Rigatoni alla Genovese duration HAS BEEN UPDATED')).catch(err=>console.log(err))

Recipe.deleteOne({title:"Carrot Cake"}).then(handleSuccess =>console.log("Carrot cake has been deleted")).catch(err=>console.log(err))