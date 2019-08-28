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

function createRecipe(){
  return Recipe.create({
    title: 'Asian Glazed Chicken Thighs',
        level: 'Amateur Chef',
        ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
        cuisine: 'Asian',
        dishType: 'Dish',
        image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
        duration: 40,
        creator: 'Chef LePapu'
  });
}

function insertRecipe(data){
  return Recipe.insertMany(data)
  .then(res => {
    console.log("All the recipes has been saved !");
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
}

function updateRecipe(id){
  return Recipe.findByIdAndUpdate(id, {duration:100})
  .then(res => {
    console.log("Has been update !", res);
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
}

function deleteRecipe(title){
  return Recipe.deleteOne(title)
  .then(res => {
    console.log("Has been delete!", res);
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
}

createRecipe();
insertRecipe(data)
updateRecipe("5d6686e076c9544c610b6637");
deleteRecipe({title:"Carrot Cake"});

mongoose.connection.close();
