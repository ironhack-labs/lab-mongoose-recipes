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

    //iteracion 2
    Recipe
    .create(
      {
      "title": "Krabby Patty",
      "level": "Easy Peasy",
      "ingredients": [
        "Secret patty meal",
        "Secret taste Onion rings",
        "Hamburger buns (whatever you like) lightly toasted",
        "Ketchup",
        "Mustard",
        "American Cheese",
        "Dill Pickle slices",
        "Lettuce",
        "Tomato"
      ],
      "cuisine": "Undersea Bikini Bottom",
      "dishType": "main_course",
      "image": "https://www.keyingredient.com/media/57/23/f5d18ba112063839f18737e66cb7df76c0b3.jpg/rh/the-krabby-patty-yes-the-real-one-well-my-version.jpg",
      "duration": 150,
      "creator": "Mr. Eugene Krabbs, Cheff SpongeBob Squarepants"
      }
    )
    .then((r) => console.log(r))
    .catch((e) => console.log(e));
    
    //iteracion 3
    Recipe
    .insertMany(
      data
    )
    .then((r) => console.log(r))
    .catch((e) => console.log(e));


  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });



  