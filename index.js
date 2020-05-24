const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Recipe
const myRecipe = new Recipe({
  title: 'Mascarpone Cheesecake Recipe',
  level: 'Easy Peasy',
  ingredients: ['400g mascarpone cheese', '200ml cream', '150g sugar', '3 eggs', '150ml milk', '1 spoon maizena', '150g cookies', '75g butter'],
  cuisine: 'Italian',
  dishType: 'dessert',
  image: 'https://www.pequerecetas.com/wp-content/uploads/2014/09/cheesecake-de-mascarpone.jpg',
  duration: 30,
  creator: 'Mamá Cocina'
});

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
    myRecipe
      .save()
      .then(newRecipe => console.log(`A new recipe was created: ${newRecipe.title}`))
      .catch(err => console.log(`Error while creating a new recipe: ${err}`))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// Instance of Cat --> Plain JS object
/*const kitty = new Cat({
    name: "Hellborn",
    age: 0,
    evilLevel: 1
});*/

// Persisting the instance to the database
/*kitty
    .save()
    .then(newCat => console.log(`A new cat is created: ${newCat}!`))
    .catch(err => console.log(`Error while creating a new cat: ${err}`));*/