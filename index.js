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

 //iteration 2 
//  const salad ={
//     title: "Cucumber Salad",
//     level: "Easy Peasy",
//     ingredients: ["cucumber", "tomato", "avocado", "lemon", "red onion", "salt", "pepper", "olive oil"],
//     cuisine: "American",
//     dishType: "other",
//     image: "https://www.shutterstock.com/image-photo/healthy-vegetarian-dish-vegetable-salad-fresh-1029610768",
//     duration: 10,
//     creator: "Chef Wendy"
//   }

//   Recipe.create(salad).then( function(results) {
//     console.log(results);
//     mongoose.disconnect();
//   })
//   .catch((error)=> {
//     console.log("Error:", error);
//   })
  
//iteration 3
// Recipe.insertMany(data)
//   .then((x)=>{
//     console.log("items added sucessfully:");
//   x.forEach(recipe => {
//     console.log(recipe.title);
//   });
// })
//   .then(() => {
//     mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log("Error:", error);
// });

// //iteration 4
// Recipe.findOneAndUpdate({title: "Rigatoni alla genovese"}, {duration:100})
//   .then(()=> {
//     console.log('recipe now updated');
// })
//   .then(()=> {
//     mongoose.disconnect();
// })
//   .catch((error) => {
//     console.log("Error:", error);
// });

// //iteration 5
// Recipe.deleteOne ({title: "Carrot Cake"})
//   .then(()=> {
//     console.log("recipe deleted");
//   })
//   .then(()=> {
//     mongoose.disconnect();
//   })
//   .catch((error) => {
//      console.log("Error:", error);
//   });

