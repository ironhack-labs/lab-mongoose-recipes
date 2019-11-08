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

// Recipe.findOneAndDelete({title: "Carrot Cake"})
//       .then(response => console.log("Successfully deleted!", response))
//       .catch(err => 
//         console.log(err));


// Recipe.updateOne({title: "Rigatoni alla Genovese"}, { duration : 100})
//       .then(response => console.log("Success!", response))
//       .catch(err => 
//         console.log(err));

  // Recipe.insertMany(data)
  // .then(response => {
  //       response.forEach(recipe => console.log(recipe.title));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });


  // Recipe.create({
  //   title: "Carelian pie",
  //   level: "Amateur Chef",
  //   cuisine: "Finnish",
  //   ingredients: ["Rice", "Milk", "Water", "Salt", "Butter", "Rye flour", "Eggs"],
  //   dishType: "Snack",
  //   image: "https://www.travelgluttons.com/wp-content/uploads/2015/04/Karelian-pie-without-egg-butter1.jpg",
  //   duration: 180,
  //   creator: "Grandma",
  //   created: 06-12-1907,
  //   })
  //   .then(response => {
  //     console.log(response.title);
  //   })
  //   .catch(err => {
    //     console.log(err);
    //   });
    
    mongoose.connection.close();
