const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js'); // Import of the data from './modeldata.js'model

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const exampleRecipe = {
  title: "Asian Glazed Chicken Thighs",
  level: "Amateur Chef",
  ingredients: ["1/2 cup rice vinegar", "5 tablespoons honey", '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: 'Dish',
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
}

Recipe.create(exampleRecipe).then(recipes => {
  console.log(exampleRecipe.title);
}).catch(err => {
  console.log(err)
});

Recipe.insertMany(data).then(recipes => {
  for (let i = 0; i < recipes.length; i++) {
    console.log(recipes[i].title)
  }
}).catch(err => {
  console.log(err)
});

Recipe.updateOne({
  title: "Rigatoni alla Genovese"
}, {
  duration: 100
}).then(response => {
  console.log("update success");
}).catch(err => {
  console.log(err);
});

Recipe.deleteOne({
  title: "Carrot Cake"
}).then(response => {
  console.log("delete success");
  mongoose.disconnect();
}).catch(err => {
  console.log(err);
});