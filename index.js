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


  //

//   const newRecipe = { title: 'Ensalada Malagueña', cuisine: 'Malagueña'};

// Recipe.create(newRecipe, (error, Recipe) => {
//   if (error) {
//     console.log("An error:", error);
//     return;
//   }
//   console.log("Recipe is created:", Recipe);
// });

// function insertMoreRecipes() {
// Recipe.insertMany(data)
// .then( res =>{
//   console.log("Insert more recipes!")
// })
// .catch( err =>{ console.log("Error!")
// }); 
// } 

// insertMoreRecipes()

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: '100' })
//   .then(res => {
//     console.log('Updated recipe!')
//   })
//   .catch(err => 
//     {console.log('Error', err)});

Recipe.deleteOne({ title: 'Carrot Cake' })
.then(res => {
      console.log('Deleted!')
    })
    .catch(err => 
      {console.log('Error', err)});
