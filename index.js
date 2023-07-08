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
    const newRecipe = {
      title: "Jollof Rice",
      level: "UltraPro Chef",
      ingrdients: ["Tomato", "Potato"],
      cuisine: "Ghanaian",
      dishType: "breakfast",
      
      duration: 45,
      creator: "Chef Franklin"
    }

    Recipe.create(newRecipe)
    .then(createdRecipe => {
      console.log(createdRecipe.title)
    })
    .catch(err => console.log(err))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
 
//Iteration 3
Recipe.insertMany(data)
.then(result => {
  result.forEach(recipe => console.log(recipe.title))
})
.catch(error => console.log(error))

//Iteration 4
Recipe.findOneAndUpdate (
  {title: "Rigatoni alla Genovese"},
  {duration: 100},
  {new: true}
)
.then(updatedRecipe => {
  console.log ("Successful Updated recipe")
})
.catch(error => {
  console.log(error)
})

//Iteration 5

Recipe.deleteOne (
  {title: "Carrot Cake"}
)

.then(() => 
console.log ("Successfully removed Carrot Cake")
)

.catch(error => {
  console.log("Is it removed?", error)
})
