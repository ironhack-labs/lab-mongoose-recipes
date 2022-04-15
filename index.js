const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
// console.log(data)
const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const newData = {
  title: 'Bakery style Lemon Poppy Seed Muffins',
  level: 'Easy Peasy',
  ingredients: [
    '3 cups of all-purpose flour', 
    '1 cup sugar', 
    '2 tbsp poppy seeds', 
    '1 tbsp baking powder',
    '1/2 tsp baking soda',
    '1 1/2 C plain whole milk yogurt',
    '2 tbsp fresh lemon juice, optional',
    '1 1/2 tbsp grated lemon zest',
    '2 large eggs',
    '8 tbsp unsalted butter, melted and cooled'
    ],
  cuisine: 'Baked good',
  dishType: 'dessert',
  image: './bakery-style-lemon-poppy-seed-muffins-vert-above-768x1192.jpg.webp' ,
  duration: 25,
  creator: 'A Kitchen Addiction',
  created: Date('2020, 09, 29')
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    // return Recipe.deleteMany()
  })
  .then(() => {
  //   // Run your code here, after you have insured that the connection was made
    // Recipe.create(newData)
    //   .then(recipe => console.log('The user is saved and its value is: ', recipe))
    //   .catch(error => console.log('An error happened while saving a new recipe:', error));
  // Recipe.insertMany(data)
  // .then(data => console.log('These recipes are saved and their values are: ', data))
  // .catch(error => console.log('An error happened while saving new recipes:', error));
    // Recipe.findOneAndUpdate({ name: 'Rigatoni alla Genovese'}, { duration: 100 })
    //   .then( console.log('These recipe has been updated!'))
    //   .catch(error => console.log('An error happened while saving new recipes:', error));
    Recipe.deleteOne({ name: 'Carrot Cake' })
    .then( console.log('The Carrot Cake recipe has been removed! '))
    .catch(error => console.log('An error happened while saving new recipes:', error));
    mongoose.connection.close()
    .then(() => console.log('connection closed!'))
    .catch(() => console.log('error closing the connection'))
  })

  //ALT SYNTAX WITH AWAITS
  // await mongoose.connection.close()
  //console.log('connection closed!')

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

