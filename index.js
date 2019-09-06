const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './data.js'

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);



// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


// Recipe.create({
//   title: "Curry",
//   cuisine: "Indian"
// }).then(newMenu => {
//   console.log(newMenu.title)
// });

// Recipe.insertMany(data)
//   .then(newMenu => {
//     newMenu.forEach(value => {
//       console.log(value.title)
//     })
//   });

Recipe.updateOne({
  title: "Rigatoni alla Genovese"
}, {
  duration: 100
}).then(() => {
  console.log("Recipe updated successfully");
});

Recipe.deleteOne({
  title: "Carrot Cake"
}).then(() => {
  console.log("Recipe deleted successfully");

mongoose.connection.close();

});

