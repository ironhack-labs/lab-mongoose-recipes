const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  // .then(() => {
  //   console.log('Connected to Mongo!');
  // }).catch(err => {
  //   console.error('Error connecting to mongo', err);
  // });

//Iteration 2
// Recipe.create(
//    { title : "Bobun",
//     level: "Easy Peasy",
//     ingredients : ["nem","salad"],
//     cuisine: "Asian",
//     dishType : "Dish",
//     duration : 30,
//     creator: "Chef Duc",
//     created : new Date(),}
//   )
// })
//Iteration 3
// Recipe.insertMany(data,(err,recipe)=>{
//   if (err) {
//     console.log('An error happened:', err);
// } else {
//     console.log('The user is saved and its value is: ', recipe.forEach(el=>console.log(el.title)));
// }
// })
//Iteration 4
// Recipe.updateOne({_id :"5caf6123146a925c7d735b94"},{$set: {duration :100}})
// .then(()=> console.log("Updated"))
// .catch(()=> console.log("Error"))

//Iteration 5
// Recipe.deleteOne({_id :"5caf6123146a925c7d735b93"})
// .then(()=> console.log("Deleted"))
// .catch(()=> console.log("Error"))