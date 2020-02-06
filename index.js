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


//Insert multiples recipes in the DB
// Recipe.insertMany(data)
//   .then(result => {
//     result.forEach(recipe => {
//       console.log("Recipe created. Title:", recipe.title);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

//Update Rigatoni alla Genovese
Recipe.updateOne({title: "Rigatoni alla Genovese"}, {duration: 100})
  .then(() => console.log("Recipe updated."))
  .catch(err => console.log(err));


//Delete Carrot Cake recipe
// let recipeToDelete = "Carrot Cake";

// Recipe.deleteOne({title: recipeToDelete})
//   .then(() => console.log("Recipe deleted."))
//   .catch(err => console.log(err));
