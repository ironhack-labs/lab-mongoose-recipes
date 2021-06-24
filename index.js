const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

let newRecipe = {
  title: "miXto quente",
  level: "Easy Peasy",
  ingredients: ["pão francês", "queijo", "presunto"],
  cuisine: "Brasileira",
  dishType: "snack",
  image:
    "http://culinaria.culturamix.com/blog/wp-content/gallery/misto-quente-3/Misto-Quente-6.jpg",
  duration: 5,
  creator: "JOC",
};

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
    return Recipe.create(newRecipe)
  })

  // ITERATION 3
  .then(() => {
    return Recipe.insertMany(data)   
  })
  // ITERATION 4
  .then(() => {
    return Recipe.updateOne(
      {title: 'Rigatoni alla Genovese'}, {duration: 100} )
  })
  // ITERATION 5

  .then(() => {
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // ITERATION 6

  mongoose.connection.close()
