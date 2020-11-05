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
    // Before adding any documents to the database, let's delete all previous entries
    //return self.connection.dropDatabase();
  })
  .then(() => {
    //ITERATION 2
  Recipe.create({
  title: "Manti",
  level: "UltraPro Chef",
  ingredients: ["flour", "salt", "egg", "ground beef"],
  cuisine: "Turkish",
  dishType: "main_course",
  image:"https://i0.wp.com/turkishfoodchef.com/wp-content/uploads/2017/02/Turkish-Ravioli-Manti-Recipe.jpg",
  duration: 30,
  creator:"cu",
  created: Date.now()
  })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
