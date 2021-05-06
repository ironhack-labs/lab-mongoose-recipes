const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { model } = require('./models/Recipe.model');

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
    return Recipe.deleteMany();
  })
  .then(() => {
      Recipe.create({
        title: 'BLT',
        level: "Amateur Chef",
        ingredients: ["sourdough bread", "bacon", "tomato", "mayo", "crisp lettuce", "salt", "pepper"],
        cuisine: "sandwich",
        dishType: "breakfast",
        image:
        "https://static01.nyt.com/images/2020/08/18/dining/27Diaryrex4/27Diaryrex4-articleLarge.jpg",
        duration: 10,
        creator: "pops",
    });
  }) 
  .then(() => {
    Recipe.create(data)
    .then(recipe => console.log('The recipe is saved and its title is: ', recipe))
    .catch(error => console.log('An error happened while saving a new recipe:', error));
  })
  .then(() => {
  Recipe.find({}, 'title')
    .then(recipe => console.log(recipe))
    .catch(e => console.log(`can't title ${e}`));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
  
  Recipe.find({}, 'title')
  .then(recipe => console.log(recipe))
  .catch(e => console.log(`oops ${e}`));