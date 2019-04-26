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

// //   Recipe.create({
// // ingredients: ["French baguette", "Beef", "Chicken", "Bacon", "Cheese", "More cheese", "A lot of cheese", "French fries"],
// // image:"http://www.kurvanfood.com/images/content/kurvan-special-02.jpg",
// // title:"Pepito",
// // level:"Amateur Chef",
// // cuisine:"Venezuelan street food",
// // dishType:"Dish",
// // duration:20,
// // creator:"Chef Angel"
// //   })
// //   .then(recipe=> {console.log('The recipe has been created and is a: ' + Recipe.title)})
// //   .catch(err=> {console.log('An error happend', err)});
  
// // Recipe.insertMany(data)
// // .then(recipe=> {console.log('The recipe has been savd!')})
// //   .catch(err=> {console.log('An error happend', err)});

//   Recipe.updateOne({title: "Chocolate Chip Cookies"} , {dishType: "Dessert"})
//   .then(recipe=> {console.log('The recipe has been updated!')})
//   .catch(err=> {console.log('An error happend', err)});

Recipe.deleteOne({title: "Chocolate Chip Cookies"})
.then(recipe=> {console.log('The recipe has been deleted!')})
 .catch(err=> {console.log('An error happend', err)});