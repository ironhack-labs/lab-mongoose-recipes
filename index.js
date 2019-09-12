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






function insertRecipes(){
  Recipe.insertMany(data)
    .then(dataArray => {
      for(let i=0; i<dataArray.length; i++){
        console.log(dataArray[i].title);
      }
    })
    .catch(err => {
      console.log("Error at creation: ", err);
    });
}




function updateRecipe(findObj, change){
  Recipe.updateOne(findObj, change)
  .then(() => {
    console.log('Update Successful!')
  })
  .catch(err => {
    console.log("Error updating recipe", err);
  });
}




function deleteRecipe(findObj){
  Recipe.deleteOne(findObj)
  .then(() => {
    console.log('Deletion Successful!')
  })
  .catch(err => {
    console.log("Error deleting recipe", err);
  });
}



let bananaPancakes = {
  title: 'bananaPancakes',
  ingredients: ['bananas', 'pancakes']
}

let recipe = new Recipe(bananaPancakes);
Recipe.create(recipe);
console.log(recipe.title);



insertRecipes();
updateRecipe({title: 'Rigatoni alla Genovese'}, {duration: 100});
deleteRecipe({title: 'Carrot Cake'});


