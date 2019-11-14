const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


let recipe1 = {
  title: 'Tartiflette',
  level: 'Easy Peasy',
  ingredients: ['potatoes', 'bacon', 'onions', 'reblochon'],
  cuisine: 'French',
  dishType: 'Dish',
  image: 'http://www.cuisine-blog.fr/wp-content/uploads/2017/11/fotolia_60240140_subscription_xxl.jpg',
  duration: 30,
  creator: 'French people'
}

// Iteration 2 - Create a recipe
// Recipe.create( recipe1 , (err, result) => {
//     if (err) console.log(err);
//     else console.log('Document inserted', result);
//   }
// );

// Iteration 3 - Insert Many recipes
// Recipe.insertMany(data)
//   .then( (result) => console.log(result))
//   .catch(err=> console.log(err));


// Iteration 4 - Update Recipe
// Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { $set: { duration: 100 } })
//   .then((result) => console.log('Recipe duration successfuly updated', result))
//   .catch(err => console.log(err));


// Iteration 5 - Remove a recipe
Recipe.deleteOne({ title:'Carrot Cake'})
  .then( (result) => console.log('Success deleting recipe', result))
  .catch(err => console.log(err));


  //Iteration 6 - Close the Database
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination',
    );
    process.exit(0);
  });
});
