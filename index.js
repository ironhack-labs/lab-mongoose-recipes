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
    // return Recipe.deleteMany();
  })
  .catch((error) => {
    console.log("Error connecting to the database: ", error);
  })
  
// Iteration 2

/*
Recipe.create({
    title: "Pepperoni Pizza",
    level: "Easy Peasy",
    ingredients: ["pizza dough", "marinara sauce", "shredded mozzarella cheese", "sliced pepperonis"],
    cuisine: "American-Italian",
    dishType: "main_course",
    image: "https://image.shutterstock.com/image-photo/tasty-pepperoni-pizza-cooking-ingredients-600w-1239982861.jpg",
    duration: 30,
    creator: "Josh McBroom, inventor of Pepperoni Pizza"
  })
  .then((dataFromDB) => {
    console.log(dataFromDB);
     mongoose.disconnect();
  })
  .catch((error) => {
     console.log("Error: ", error);
  })
*/
  
// Iteration 3

// Recipe.insertMany(data)
//   .then((dataFromDB) => {
//     console.log(dataFromDB.length);
//     dataFromDB.forEach(recipe => {
//       console.log(recipe.title);
//     });
//   })
//   .then(() => {
//     mongoose.disconnect();
//   })
//   .catch(error => {
//     mongoose.disconnect();
//     console.error('Error connecting to the database', error);
//   });

// Iteration 4

// Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese'}, { duration: 100 }, { new: true })
// .then(() => {
//   console.log(`Success! Recipe updated!`);
// })
// .then(() => {
//   mongoose.disconnect();
// })
// .catch(error => {
//   mongoose.disconnect();
//   console.log("the error is: ", error);
// });

// Iteration 5
// Recipe.deleteOne({ title: "Carrot Cake" })
//   .then(() => {
//     console.log("Recipe successfully deleted!");
//   })
//   .then(() => {
//     mongoose.disconnect();
//   })
//   .catch((error) => {
//     console.log("Error while deleting item! Error: ", error);
//   });
