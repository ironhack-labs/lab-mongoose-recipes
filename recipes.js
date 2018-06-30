const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js')

const recipeSchema = new Schema({
  title: String,
  level: {type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef']},
  ingredients: Array,
  cousine: {type: String, required: true},
  dishType: {type: String, enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]},
  image: {type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg'},
  duration: {type: Number, min: 0},
  creator: String,
  created: {
    type: Date,
    default: Date.now
    }
}); 

const Recipe = mongoose.model('Recipe', recipeSchema);

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

  function addNewRecipe(newRecipe){
    Recipe.create(newRecipe).then((recipe) => {
      console.log("The recipe is saved and its value is: ", recipe);
    }).catch((err) => {
        console.log("An error happened", err);
    });
  }

addNewRecipe({
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cousine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
});

  function insertRecipes(newRecipes){
    Recipe.insertMany(newRecipes)
    .then((data) => {console.log("Inserted Many Succes!!", data);})
    .catch((err) => {console.log("Error Inserting Many!!!", err);});
  }

  //insertRecipes(data);

  function updateRecipe(field,value){
    Recipe.updateOne(field,value)
      .then(() => {
        console.log("Success updated!");
        console.log(field,value);
      })
      .catch((error) => {console.log(error)})
  }

updateRecipe({title: 'Rigatoni alla Genovese'}, {duration: 200});

function deleteRecipe(recipe){
  Recipe.deleteOne(recipe)
  .then(() => {
    console.log("Success removed!");
    mongoose.connection.close()
  })
  .catch((error) => {console.log(error)})
}

deleteRecipe({title: 'Carrot Cake'});
