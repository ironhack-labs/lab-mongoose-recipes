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
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


// Iteration 2

  // const pizza = {
  //   title: 'Pizza',
  //   level: 'Amateur Chef',
  //   ingredients: ['pizza dough', 'mozzarella cheese', 'tomato sauce'],
  //   cuisine: 'Italian',
  //   dishType: 'main_course',
  //   duration: 30,
  //   creator: 'Ryan'
  // }


  // Recipe.create(pizza).then((results) => {
  //   console.log(results)
  // })
  // .then(() => {
  //   mongoose.disconnect();
  // })
  // .catch((error) => {
  //   console.log('Something Went Wrong', error)
  // })


// Iteration 3

// Recipe.insertMany(data)
//   .then((dataFromDB) => {
//     console.log(dataFromDB);
//     dataFromDB.forEach(recipe => {
//       console.log(recipe.title);
//     });
//   })
//   .then(() => {
//     mongoose.disconnect();
//   })
//   .catch((error) => {
//     console.log('Something Went Wrong', error);
//   });



// Iteration 4

// Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese"}, { duration: 100})
//   .then(() => {
//     console.log('Item was updated');
//   })
//   .then(() => {
//     mongoose.disconnect();
//   })
//   .catch((error) => {
//     console.log('Something Went Wrong', error);
//   });


// Iteration 5

// Recipe.deleteOne({ title: "Carrot Cake"})
//   .then(() => {
//     console.log('Recipe was deleted!!');
//   })
//   .then(() => {
//     mongoose.disconnect();
//   })
//   .catch((error) => {
//     console.log('Something went wrong', error);
//   });