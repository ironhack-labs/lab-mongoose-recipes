const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data.js'); // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose
  .connect('mongodb://localhost/recipe-app-dev', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


// Iteration 2 recipes created!

// let newRecipe = {
//   title: "Lemon Pie",
//   level: "Amateur Chef",
//   ingredients: ["Lemon", "Sugar", "Cookies", "Butter", "Eggs", "Condensed Milk"],
//   cuisine: 'International',
//   dishType: 'Dessert',
//   image: '',
//   duration: 60,
//   creator: 'Chef Flor'
// }


  // Recipe.create(newRecipe)
  // .then(result => {
  //   console.log("Created a recipe", result);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // Iteration 3 recipes created!
  // Recipe.insertMany(data)
  // .then(result => {
  //   console.log("Created a recipe", result);
  // })
  // .catch(err => {
  //   console.log(err);
  // });

  // iteration 4
  Recipe.findOneAndUpdate({name: "Rigatoni alla Genovese"}, {$set:{duration:100}},function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(doc);
});