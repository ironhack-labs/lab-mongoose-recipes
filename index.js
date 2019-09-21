const express = require(`express`)
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true , useUnifiedTopology: true })
.then((x) => {
  console.log(`Connected to the database: ${x.connections[0].name}`);
}).catch(err => {
  console.error('Error connecting to mongo', err);
});

const app = express();

app.set(`views`, `${__dirname}/views`);
app.set(`view engine`, `pug`);

app.get(`/`, (req, res, next) => {
  res.render(`index`);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});

let melRecipe = {
  title: `Gourmet PB&J`,
  level: `Easy Peasy`,
  ingredients: [`2 slices of preferred bread`, `2 tablespoons peanut butter`, `1 1/2 tablespoon strawberry jelly`],
  cuisine: 'American',
  dishType: 'Snack',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 5,
  creator: 'Chef LeMel'  
}

function createRecipe(newRecipe) {
  Recipe.create(newRecipe)
  .then( (recipe) => console.log(recipe.title) )
  .catch( (err) => console.log(err) )
}

createRecipe(melRecipe);

function createRecipes(recipesArray) {

  Recipe.insertMany(recipesArray)
  .then( (recipes) => {
    recipes.forEach( (recipe) => console.log(recipe.title) )
  })
  .catch( (err) => console.log(err) );

}

createRecipes(data);

function updateRecipe(queryKey, queryValue, updateKey, updateValue) {

  Recipe.updateOne( { title: queryValue } , { duration: updateValue } )
  .then( (recipe) => console.log(`Recipe ${queryValue} was updated correctly`) )
  .catch( (err) => console.log(err) );

}

updateRecipe(`title`, `Rigatoni alla Genovese`, `duration`, 100);

function deleteRecipe(queryKey, queryValue) {
  Recipe.deleteOne( { title: queryValue } , () => console.log(`${queryValue} was deleted succesfully`) );
}

deleteRecipe(`title`, `Carrot Cake`);

mongoose.connection.close(() => console.log(`Connection to db ended`));