const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const spanishOmelette = {
  title: 'Spanish Omelette',
  level: 'Easy Peasy',
  ingredients: [ 'Potatoes', 'Onion', 'Eggs', 'Olive Oil', 'Salt' ],
  cuisine: 'traditional',
  dishType: 'main_course',
  image: 'https://www.65ymas.com/uploads/s1/35/92/57/bigstock-spanish-omelette-with-potatoes-351100148_1_621x621.jpeg',
  duration: 60,
  creator: 'Miguel Valle'
}

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
    Recipe.create(spanishOmelette)
      .then(newR => console.log(`A new recipe is created: ${newR.title}!`))
      .then (() => Recipe.insertMany (data))
      .then (() => data.forEach(recipe => {console.log(`A new recipe is created: ${recipe.title}!`)}))
      .then (() => Recipe.findOneAndUpdate({ title : 'Rigatoni alla Genovese' }, { duration : 100 }))
      .then(rigatoni => console.log(`Recipe updated: ${rigatoni.title}!`))
      .catch(err => console.log(`Error while creating a new recipe: ${err}`));
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
