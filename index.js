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


  //ITERATION 2 
// In index.js, using the Model.create method, you should pass the info to create a new recipe. After the creation, you can use MongoDB Compass to check everything went ok. After inserting the recipe, console.log the title of the recipe.

// const newRecipe = { title: 'Fruit Salad', cuisine: 'American'};

// Recipe.create(newRecipe, (error, Recipe) => {
//   if (error) {
//     console.log('An error happened:', error);
//     return;
//   }
//   console.log('Fruit Salad is added');
// });

// 'The user is saved and its value is: ', Recipe
//ITERATION 3 -- you had to comment out the last iteration to get the next iteration to work - you did node index.js for it to work - .then if it is successful OTHERWISE .catch if it is not successful 
// function insertMoreRecipes() {
// Recipe.insertMany(data)
// .then( res =>{
//   console.log("success!!!!")
// })
// .catch( err =>{ console.log("Something bad happened!")
// }); 
// } 

// insertMoreRecipes()


//ITERATION 4 

// Now you should have six different recipes in the database, but there was a mistake in one of them. The **Rigatoni alla Genovese** does not take that long. You should update the `duration` field and set it to **100**. After updating it, print a success message!

// Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: '100' })
//   .then(res => {
//     console.log('recipe updated!!')
//   })
//   .catch(err => 
//     {console.log('recipe not updated :(', err)});


//ITERATION 5 

Recipe.deleteOne({ title: 'Carrot Cake' })
.then(res => {
      console.log('recipe deleted!!')
    })
    .catch(err => 
      {console.log('recipe not deleted :(', err)});
  