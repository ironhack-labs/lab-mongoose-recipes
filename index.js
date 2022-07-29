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
    /* return Recipe.deleteMany() */
  })

/*   Recipe
    .create ({
      title: 'Veggie Curry',
      level: 'Easy Peasy',
      ingredients: ['curry','tomato sauce', 'eggplant', 'coconut milk'],
      cuisine: 'no idea',
      

      })
  .then((newRecipe) => console.log (newRecipe)) */
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


/* Recipe.insertMany(data)
.then((recipes) => console.log(recipes))
.catch((err)=> console.log(err)); */

/* Recipe.findOneAndUpdate({title:"Rigatoni alla Genovese"}, {duration:100})
.then((recipe) => console.log (recipe))
.catch((err) => console.log(err)); */

/* Recipe.deleteOne({title: "Carrot Cake"})
.then((recipe) => console.log (recipe))
.catch((err) => console.log(err)); */

prototype.close(MONGODB_URI )
