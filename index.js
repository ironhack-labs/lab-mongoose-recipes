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
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const recipe = new Recipe ({
      title: "Spaguetti",
      level:"Easy Peasy",
      Ingredients:["pasta","tomato souce"],
      cuisine: "Italian",
      dishType: "main_course",
      duration:30,
      creator:"Italian Chef"
      });

    Recipe.create(recipe)
    .then(recipe => console.log(recipe))  
    .catch(err => console.log(`Error creating recipe ${err}`)

    )
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
