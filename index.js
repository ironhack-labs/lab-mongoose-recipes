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

 Recipe.create({
    title: 'Mississippi Mud Pie',
    level: 'Amateur Chef',
    ingredients: ['1 cup all-purpose flour', '1 cup chopped pecans', '1/2 cup butter, softened', '1 package (5.9 ounces) instant chocolate pudding mix', '1 package (8 ounces) cream cheese, softened', '1 cup confectioners\' sugar', '1 container (16 ounces) frozen whipped topping, thawed, divided', 'Toasted chopped pecans and chocolate curls, optional'],
    cuisine: 'Comfort',
    dishType: 'Dessert',
    image: 'https://static01.nyt.com/images/2017/04/11/dining/11COOKING-MISSISSIPPI-MUD-PIE2/11COOKING-MISSISSIPPI-MUD-PIE2-articleLarge.jpg',
    duration: 25,
    creator: 'Unknown'
  }).then(recipe => console.log(recipe.title))
  .catch(error => console.log(error));  

  let insertRecipes = Recipe.insertMany(data)
  .then(values => values.forEach(value => console.log(value.title)))
  .catch(error => console.log(error));

  let updateRecipe = Recipe.updateOne({ title: "Rigatoni alla Genovese"}, { duration: 100 })
  .then(console.log("successfully updated!"))
  .catch(error => console.log(error));

 let deleteRecipe = Recipe.deleteOne({title: "Carrot Cake"})
  .then(console.log("successfully deleted!"))
  .catch(error => console.log(error));

  Promise.all([insertRecipes, updateRecipe, deleteRecipe])
  .then(values => {
    console.log(values);
    mongoose.connection.close();
  })
  .catch(error => console.log(error));

  
